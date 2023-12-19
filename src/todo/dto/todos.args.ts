import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class TodosArgs {
  @IsOptional()
  @Field(() => Int)
  @Min(0)
  page?: number;

  @IsOptional()
  @Field(() => Int)
  @Min(1)
  @Max(50)
  count?: number;

  @IsOptional()
  @Field({ nullable: true })
  keyword?: string;
}
