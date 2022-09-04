import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Guard } from 'src/services/auth/guard/jwt.guard';
import { QuestionsService } from 'src/services/questions/questions.service';
import { QuestionsDTO } from 'src/struct/dto/question.dto';
import { CreateQuestion, ShuffBool } from 'src/struct/input/input';
import { Message } from 'src/struct/reponses/types';

@Resolver()
export class QuestionsResolver {
  constructor(private readonly question: QuestionsService) {}

  @UseGuards(Guard)
  @Query(() => [QuestionsDTO])
  async questions(@Args() shuffle: ShuffBool) {
    const questionDiff = await this.question.getQuestions();

    if (!shuffle.shuffle) {
      return this.question.getQuestions();
    }

    return questionDiff.sort(() => Math.random() - 0.5);
  }

  @UseGuards(Guard)
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
