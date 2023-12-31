import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field()
  completed: boolean;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsDate()
  endDate: Date;
}
