import { Module } from '@nestjs/common';
import { QuestionsResolver } from 'src/app/questions.resolver';
import { ConnectorModule } from 'src/providers/database/connector.module';
import { QuestionProviders } from 'src/providers/entities/providers';
import { QuestionsService } from './questions.service';

@Module({
  imports: [ConnectorModule],
  providers: [QuestionsService, QuestionsResolver, ...QuestionProviders],
  exports: [QuestionsService],
})
export class QuestionsModule {}
