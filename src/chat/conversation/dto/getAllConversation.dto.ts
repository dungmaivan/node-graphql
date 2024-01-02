import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAllConversationsDto {
  @Field()
  userId: string;
}
