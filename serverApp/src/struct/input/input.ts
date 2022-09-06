import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
class CreateUser {
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly email: string;
  @Field(() => String)
  readonly picture: string;
  @Field(() => Number, { nullable: true })
  readonly rate: number;
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

@ArgsType()
class ShuffBool {
  @Field(() => Boolean)
  readonly shuffle: boolean;
}

@InputType()
class UpdateQuizz {
  @Field(() => String)
  quizId: string;
  @Field(() => GraphQLJSON)
  attempts: {
    correct: number;
    incorrect: number;
    attempt_count: number;
  };
}

@InputType()
class ScoreSummary extends PickType(CreateUser, ['rate']) {}

export {
  CreateUser,
  CreateQuestion,
  AuthInput,
  ShuffBool,
  UpdateQuizz,
  ScoreSummary,
};
