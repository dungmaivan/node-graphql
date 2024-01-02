import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from './message.resolver';
import { CreateMessageDto } from './dto/create-message.dto';
import { mockGetAllMessage } from './mock';

describe('Test MessageResolver', () => {
  let resolver: MessageResolver;

  const mockMessageService = {
    findAll: jest.fn(),
    createMessage: jest.fn(),
    getAllMessage: jest.fn(),
    getAMessage: jest.fn(),
    deleteMessage: jest.fn(),
  };
  const createMessageData: CreateMessageDto = {
    content: 'fuck you, tony',
    conversationId: '658cfec0713b7e5aeef66179',
  };
  const mockMessage = {
    content: 'fuckyou',
    conversationId: '658cfec0713b7e5aeef66179',
    id: '658d2eae875404299a9be9ac',
    senderId: '658d196f9f963ef63addedf9',
  };
  const mockMessages = [mockMessage];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageResolver,
          useValue: mockMessageService,
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
  });

  it('Test MessageResolver should defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Test create message', () => {
    it('should create message', async () => {
      mockMessageService.createMessage.mockResolvedValueOnce(mockMessage);
      const result = await resolver.createMessage(
        createMessageData,
        mockMessage.senderId,
      );
      expect(result).toEqual(mockMessage);
    });
  });
  describe('test get all message', () => {
    it('should be return all message', async () => {
      mockMessageService.getAllMessage.mockResolvedValue(mockMessages);
      const result = await resolver.getAllMessage(mockGetAllMessage);
      expect(result).toEqual(mockMessages);
    });
  });

  describe('test get a messges', () => {
    it('should be return a message', async () => {
      mockMessageService.getAMessage.mockResolvedValue(mockMessage);
      const result = await resolver.getAMessage(mockMessage.id);
      expect(result).toEqual(mockMessage);
    });
  });

  describe('test delete message', () => {
    it('should delete message', async () => {
      mockMessageService.deleteMessage.mockResolvedValue(
        'Delete message success',
      );
      const result = await resolver.deleteMessage(mockMessage.id);
      expect(result).toEqual('Delete message success');
    });
  });
});
