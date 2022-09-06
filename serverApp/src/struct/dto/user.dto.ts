import { Field, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
class UserDTO {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly email: string;
  @Field(() => String)
  readonly picture: string;
  @Field(() => [GraphQLJSON], { nullable: true })
  readonly quizzes: Array<any>;
  @Field(() => Number, { nullable: true })
  readonly rate: number;
}
export { UserDTO };
