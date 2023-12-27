import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Login {
  @Field()
  message: string;
  @Field()
  token: string;
}
