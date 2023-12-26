import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType({ description: 'message' })
export class MessageModel {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @Field()
  createAt: Date;
}
