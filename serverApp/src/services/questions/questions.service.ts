import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateQuestion } from 'src/struct/input/input';
import { IQuestions } from 'src/struct/interface/interface';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTIONS_MODEL')
    private readonly questionModel: Model<IQuestions>,
  ) {}

  getQuestions = async (): Promise<IQuestions[]> => {
    return await this.questionModel.find().exec();
  };

  getQuestionsById = async (questionId: string): Promise<string> => {
    return '';
  };

  makeQuestion = async (makeQuestion: CreateQuestion): Promise<IQuestions> => {
    const makeNewQuestion = new this.questionModel(makeQuestion);
    return await makeNewQuestion.save();
  };
}
