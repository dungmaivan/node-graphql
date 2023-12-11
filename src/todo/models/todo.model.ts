import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType({ description: 'todo ' })
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @IsOptional()
  completed?: boolean;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  endDate: Date
}
