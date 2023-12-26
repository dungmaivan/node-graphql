import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-consersation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './model/conversation.model';
import mongoose from 'mongoose';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: mongoose.Model<Conversation>,
  ) {}

  async createConversation(
    conversation: CreateConversationDto,
    senderId: string,
  ): Promise<Conversation> {
    const data = {
      ...conversation,
      member: [conversation.targetUser, senderId],
      messages: [],
    };
    const newConversation = await this.conversationModel.create(data);
    return newConversation;
  }
}
