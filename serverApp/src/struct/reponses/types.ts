import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Message {
  @Field(() => String)
  message: string;
}
export { Message };
