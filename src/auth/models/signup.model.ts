import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Signup {
  @Field()
  token: string;
}
