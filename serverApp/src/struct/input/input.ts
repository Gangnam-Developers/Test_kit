import { ArgsType, Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
class CreateUser {
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly email: string;
  @Field(() => String)
  readonly picture: string;
}

@InputType()
class CreateQuestion {
  @Field(() => String)
  readonly question: string;
  @Field(() => [GraphQLJSON])
  readonly options: Array<{ option: string; isCorrect: boolean }>;
}

@ArgsType()
class AuthInput {
  @Field(() => String)
  readonly access_token: string;
}

export { CreateUser, CreateQuestion, AuthInput };
