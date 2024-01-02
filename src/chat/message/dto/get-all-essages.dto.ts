import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class GetAllMessageDto {
  @Field()
  @IsOptional()
  @IsNumber()
  offset: number;

  @Field()
  @IsNotEmpty()
  conversationId: string;
}
