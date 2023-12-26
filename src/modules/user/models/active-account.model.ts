import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActiveAccount {
  @Field()
  message: string;
}
