import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForgotPasswordRequest {
  @Field()
  message: string;
  @Field()
  token: string;
}
