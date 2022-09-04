import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
export { UserDTO };
