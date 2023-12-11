import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field()
  @IsString()
  _id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field()
  completed: boolean;
  


  @Field()
  @IsDate()
  endDate: Date;

}
