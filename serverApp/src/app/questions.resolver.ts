import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Guard } from 'src/services/auth/guard/jwt.guard';
import { QuestionsService } from 'src/services/questions/questions.service';
import { UserService } from 'src/services/users/user.service';
import { QuestionsDTO } from 'src/struct/dto/question.dto';
import { CreateQuestion, ShuffBool } from 'src/struct/input/input';
import { Message } from 'src/struct/reponses/types';
import { CurrentUser } from 'src/util/util.decorators';

@Resolver()
export class QuestionsResolver {
  constructor(
    private readonly question: QuestionsService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(Guard)
  @Query(() => [QuestionsDTO])
  async questions(@Args() shuffle: ShuffBool, @CurrentUser() user: any) {
    const questionDiff = await this.question.getQuestions();

    const _user = await this.userService.getUser(user.email);

    if (_user.quizzes.length !== 0) {
      return questionDiff.filter(
        (x) => !_user.quizzes.some((y) => y.quizId === x.id),
      );
    }

    if (!questionDiff) {
      return new Error('No Data');
    }

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
