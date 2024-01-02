import { Model } from 'mongoose';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventGateWay } from '../events/events.gateway';
import { GetAllMessageDto } from './dto/get-all-essages.dto';
import { CreateMessageDto } from './dto/create-message.dto';

describe('test message service', () => {
  let messageService: MessageService;
  let service: Model<Message>;
  let eventGateWay: EventGateWay;
  const mockService = {
    find: jest.fn(),
    sort: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getModelToken(Message.name),
          useValue: mockService,
        },
        EventGateWay,
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    eventGateWay = module.get<EventGateWay>(EventGateWay);
    service = module.get<Model<Message>>(getModelToken(Message.name));
  });
  const mockGetAllMessage: GetAllMessageDto = {
    conversationId: '658cfec0713b7e5aeef66179',
    offset: 0,
  };

  const mockCreateMessage: CreateMessageDto = {
    content: 'update content',
    conversationId: '658cfec0713b7e5aeef66179',
  };

  const mockMessage = [
    {
      id: '658cfeea1f452a5f8b853bab',
      content: 'hello again',
      senderId: '658a569b7950667300a061ce',
      conversationId: '658cfec0713b7e5aeef66179',
      createdAt: '2023-12-28T04:51:54.180Z',
      updatedAt: '2023-12-28T04:51:54.180Z',
    },
  ];

  const mockMessageEdited = {
    id: '658cfeea1f452a5f8b853bab',
    content: 'update content',
    senderId: '658a569b7950667300a061ce',
    conversationId: '658cfec0713b7e5aeef66179',
    createdAt: '2023-12-28T04:51:54.180Z',
    updatedAt: '2023-12-28T04:51:54.180Z',
  };
  const mockDeleteSuccess = 'Delete message success';
  mockService.find.mockReturnValue({
    sort: jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue(mockMessage),
      }),
    }),
  });

  it('should be defined', () => {
    expect(messageService).toBeDefined();
  });

  describe('test getAllMessageOnConversation', () => {
    it('should get all messgae on conversation', async () => {
      const result =
        await messageService.getAllMessageOnConversation(mockGetAllMessage);
      expect(result).toEqual(mockMessage);
    });
  });

  describe('test get one conversation', () => {
    it('should get one conversation', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mockMessage[0]);
      const result = await messageService.getAMessage(mockMessage[0].id);
      expect(result).toEqual(mockMessage[0]);
    });

    it('should thow error cause wrong conversationid', async () => {
      try {
        await messageService.getAMessage('wrong-conversation-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('test create message', () => {
    it('should cteate a message', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockMessage[0] as never);
      jest
        .spyOn(eventGateWay, 'sendNewMessage')
        .mockResolvedValue(mockMessage[0] as never);
      const result = await messageService.createMessage(
        mockCreateMessage,
        mockMessage[0].id,
      );
      expect(result).toEqual(mockMessage[0]);
    });
  });

  describe('test edit message', () => {
    it('should edit a message', async () => {
      jest
        .spyOn(service, 'findOneAndUpdate')
        .mockResolvedValueOnce(mockMessageEdited as never);
      const result = await messageService.editMessage({
        content: mockMessageEdited.content,
        messageId: mockMessageEdited.id,
      });
      expect(result).toEqual(mockMessageEdited);
    });
  });

  describe('test delete message', () => {
    it('should delete a message', async () => {
      jest
        .spyOn(service, 'findByIdAndDelete')
        .mockResolvedValueOnce(mockMessage[0] as never);
      const result = await messageService.deleteMessage(mockMessage[0].id);
      expect(result).toEqual(mockDeleteSuccess);
    });

    it('should thow error cause wrong messageid', async () => {
      try {
        await messageService.deleteMessage('wrong-message-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
