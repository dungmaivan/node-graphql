import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class EditMessageDto {
  @Field()
  @IsNotEmpty()
  messageId: string;

  @Field()
  content: string;
}
