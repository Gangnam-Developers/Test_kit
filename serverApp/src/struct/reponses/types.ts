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
  @Field(() => String, { nullable: true })
  error?: string;
}
export { Message, Token };
