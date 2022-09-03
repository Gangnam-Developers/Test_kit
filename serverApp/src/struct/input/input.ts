import { Field, InputType, PickType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { UserDTO } from '../dto/user.dto';

@InputType()
class CreateUser extends PickType(UserDTO, [
  'firstname',
  'lastname',
  'email',
] as const) {}

@InputType()
class CreateQuestion {
  @Field(() => String)
  readonly question: string;
  @Field(() => [GraphQLJSON])
  readonly options: Array<{ option: string; isCorrect: boolean }>;
}

export { CreateUser, CreateQuestion };
