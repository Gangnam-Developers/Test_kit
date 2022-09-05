import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Guard } from 'src/services/auth/guard/jwt.guard';
import { QuestionsService } from 'src/services/questions/questions.service';
import { UserService } from 'src/services/users/user.service';
import { UserDTO } from 'src/struct/dto/user.dto';
import { UpdateQuizz } from 'src/struct/input/input';
import { Message } from 'src/struct/reponses/types';
import { CurrentUser } from 'src/util/util.decorators';

@Resolver()
export class UserResolvers {
  constructor(
    private readonly userService: UserService,
    private readonly question: QuestionsService,
  ) {}

  @UseGuards(Guard)
  @Mutation(() => UserDTO)
  async getCurrentUser(@CurrentUser() user: any) {
    return await this.userService.getUser(user.email);
  }

  @UseGuards(Guard)
  @Mutation(() => Message)
  async assignedQuiz(
    @Args('input') quizzes: UpdateQuizz,
    @CurrentUser() user: any,
  ) {
    try {
      const _user = await this.userService.getUser(user.email);

      if (!_user) {
        return new Error('UNAUTHORIZED');
      }

      if (_user) {
        const gained = 100 - Math.ceil(quizzes.attempts.incorrect * (100 / 3));
        const sign_attempt = await this.userService.updateQuizz(user.email, {
          ...quizzes,
          gained: gained,
        });

        if (sign_attempt.isModified) {
          return {
            message: 'Assgined Successful',
          };
        }
      }
      return {
        error: "Can't assigned to non-existed user",
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
