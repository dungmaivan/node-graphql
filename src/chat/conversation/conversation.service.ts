import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/createConsersation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './model/conversation.model';
import mongoose from 'mongoose';
import { GetAllConversationsDto } from './dto/getAllConversation.dto';
import { MessageModel } from './model/message.model';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: mongoose.Model<Conversation>,
  ) {}

  async getAllConversations(
    useId: GetAllConversationsDto,
  ): Promise<Conversation[]> {
    const conversations = await this.conversationModel.find({
      member: { $all: useId },
    });
    return conversations;
  }

  async createConversation(
    conversation: CreateConversationDto,
    senderId: string,
  ): Promise<Conversation> {
    const members = [conversation.targetUser, senderId];
    members.sort();
    const existsConversation = await this.conversationModel.findOne({
      member: members,
    });
    if (existsConversation) {
      console.log(existsConversation);
      return existsConversation;
    }

    const data = {
      ...conversation,
      member: members,
      messages: [],
    };
    const newConversation = await this.conversationModel.create(data);
    return newConversation;
  }

  async getConversationById(id: string): Promise<Conversation> {
    const conversation = await this.conversationModel.findById(id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return conversation;
  }

  async deleteConversation(id: string): Promise<MessageModel> {
    const conversation = await this.conversationModel.findByIdAndDelete(id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const result = {
      massage: 'Delete conversation success',
    };
    return result;
  }
}
