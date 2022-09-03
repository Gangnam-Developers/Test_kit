import { Module } from '@nestjs/common';
import { DatabaseProviders } from './connector.providers';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class ConnectorModule {}
