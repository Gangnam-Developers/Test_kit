import { Module } from '@nestjs/common';
import { UserResolvers } from 'src/app/users.resolver';
import { ConnectorModule } from 'src/providers/database/connector.module';
import { UserProviders } from 'src/providers/entities/providers';
import { UserService } from './user.service';

@Module({
  imports: [ConnectorModule],
  providers: [UserService, UserResolvers, ...UserProviders],
  exports: [UserService],
})
export class UserModule {}
