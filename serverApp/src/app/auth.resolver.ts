import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthInput } from 'src/struct/input/input';
import { Token } from 'src/struct/reponses/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async auth(@Args() input: AuthInput) {
    return this.authService.login(input);
  }
}
