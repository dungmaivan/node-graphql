import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class TodosArgs {
  @Field(() => Int)
  @Min(0)
  page: number;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  count: number;

  @IsOptional()
  @Field({ nullable: true })
  keyword?: string;
}
