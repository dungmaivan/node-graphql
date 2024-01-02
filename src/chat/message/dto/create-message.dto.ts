import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  @Field()
  content: string;

  @Field()
  conversationId: string;
}
