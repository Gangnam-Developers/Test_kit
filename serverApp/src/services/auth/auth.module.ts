import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from 'src/app/auth.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: `30d` },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [AuthService, JWTStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
