import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { QuestionsService } from 'src/services/questions/questions.service';
import { QuestionsDTO } from 'src/struct/dto/question.dto';
import { CreateQuestion } from 'src/struct/input/input';
import { Message } from 'src/struct/reponses/types';

@Resolver()
export class QuestionsResolver {
  constructor(private readonly question: QuestionsService) {}

  @Query(() => [QuestionsDTO])
  async questions() {
    return this.question.getQuestions();
  }

  @Mutation(() => Message)
  async createQuestion(@Args('make') make: CreateQuestion) {
    try {
      await this.question.makeQuestion(make);

      return {
        message: 'Created Successful',
      };
    } catch (error) {
      throw new HttpException(
        'Cant create new question',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
