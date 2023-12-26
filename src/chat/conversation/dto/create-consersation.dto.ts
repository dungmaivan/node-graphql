import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateConversationDto {
  @Field()
  targetUser: string;
}
