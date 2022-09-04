import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { Guard } from 'src/services/auth/guard/jwt.guard';
import { UserService } from 'src/services/users/user.service';
import { UserDTO } from 'src/struct/dto/user.dto';
import { CurrentUser } from 'src/util/util.decorators';

@Resolver()
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @UseGuards(Guard)
  @Mutation(() => UserDTO)
  async getCurrentUser(@CurrentUser() user: any) {
    return await this.userService.getUser(user.email);
  }
}
