import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './model/message.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../lib/guards/auth.gurad';
import { CurrentUser } from '../../lib/decorator/user.decorator.graphql';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetAllMessageDto } from './dto/get-all-essages.dto';
import { EditMessageDto } from './dto/update-message.dto';

@Resolver('Chat')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  // send a new messag
  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Args('createMessage') createMessageData: CreateMessageDto,
    @CurrentUser() user,
  ) {
    const newMessage = await this.messageService.createMessage(
      createMessageData,
      user._id,
    );
    return newMessage;
  }

  @Query(() => [Message])
  @UseGuards(JwtAuthGuard)
  async getAllMessage(
    @Args('getAllMessage') getAllMessageData: GetAllMessageDto,
  ) {
    const messages =
      this.messageService.getAllMessageOnConversation(getAllMessageData);
    return messages;
  }

  @Query(() => Message)
  @UseGuards(JwtAuthGuard)
  async getAMessage(@Args('messageId') messageId: string) {
    const message = await this.messageService.getAMessage(messageId);
    return message;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteMessage(@Args('messageId') messageId: string) {
    const message = await this.messageService.deleteMessage(messageId);

    return message;
  }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async updateMessage(@Args('messageId') EditMessageData: EditMessageDto) {
    const message = await this.messageService.editMessage(EditMessageData);
    return message;
  }
}
