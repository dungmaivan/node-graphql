import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Messages } from '../schema/message.schema';

@ObjectType({ description: 'conversation ' })
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [String])
  member: string[];

  @Field()
  createdAt: Date;
}
