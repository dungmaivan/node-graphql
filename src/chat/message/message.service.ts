import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './model/message.model';
import mongoose from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { EventGateWay } from '../events/events.gateway';
import { GetAllMessageDto } from './dto/get-all-essages.dto';
import { PAGE_SIZE } from '../../config';
import { EditMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: mongoose.Model<Message>,
    private eventGateway: EventGateWay,
  ) {}

  async createMessage(newMessage: CreateMessageDto, senderId: string) {
    const data = {
      ...newMessage,
      senderId: senderId,
    };
    const message = await this.messageModel.create(data);
    this.eventGateway.sendNewMessage(message);
    return message;
  }

  async getAllMessageOnConversation(
    getAllMessage: GetAllMessageDto,
  ): Promise<Message[]> {
    const skip = getAllMessage.offset || 0;
    const messages = await this.messageModel
      .find({
        conversationId: getAllMessage.conversationId,
      })
      .sort({ datefield: -1 })
      .limit(PAGE_SIZE)
      .skip(skip);
    if (!messages.length) return [];
    return messages;
  }

  async getAMessage(messageId: string): Promise<Message> {
    const message = await this.messageModel.findById(messageId);
    if (!message) {
      throw new Error('Message not found');
    }
    return message;
  }

  async editMessage(editMessageData: EditMessageDto): Promise<Message> {
    const message = await this.messageModel.findOneAndUpdate(
      {
        id: editMessageData.messageId,
      },
      {
        $set: { content: editMessageData.content },
      },
    );
    return message;
  }

  async deleteMessage(messageId: string) {
    const message = await this.messageModel.findByIdAndDelete(messageId);
    if (!message) throw new Error('Message not found');
    return 'Delete message success';
  }
}
