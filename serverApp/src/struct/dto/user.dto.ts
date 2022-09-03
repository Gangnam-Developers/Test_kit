import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserDTO {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  readonly firstname: string;
  @Field(() => String)
  readonly lastname: string;
  @Field(() => String)
  readonly email: string;
}
export { UserDTO };
