import { Field, ObjectType } from '@nestjs/graphql';
// import { Messages } from '../schema/message.schema';

@ObjectType()
export class MessageModel {
  @Field()
  massage: string;
}
