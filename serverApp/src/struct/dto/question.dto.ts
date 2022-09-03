import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
class QuestionsDTO {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  readonly question: string;
  @Field(() => [GraphQLJSON])
  readonly options: Array<{ option: string; isCorrect: boolean }>;
}
export { QuestionsDTO };
