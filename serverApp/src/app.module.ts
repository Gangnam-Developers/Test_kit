import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './services/auth/strategies/google.strategy';
import { ConnectorModule } from './providers/database/connector.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './services/users/user.module';
import { QuestionsModule } from './services/questions/questions.module';
import { QuestionsResolver } from './app/questions.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      debug: false,
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConnectorModule,
    UserModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, QuestionsResolver],
})
export class AppModule {}
