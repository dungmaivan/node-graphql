import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResetPasswordRequest {
  @Field()
  message: string;
}
