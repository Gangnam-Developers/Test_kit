import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Token {
  @Field(() => String)
  access_token: string;
}

@ObjectType()
class Message {
  @Field(() => String)
  message: string;
}
export { Message, Token };
