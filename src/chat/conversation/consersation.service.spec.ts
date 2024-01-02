import { Model } from 'mongoose';
import { ConversationService } from './conversation.service';
import { Conversation } from './schema/conversation.schema';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

describe('test conversation', () => {
  let conversationService: ConversationService;
  let service: Model<Conversation>;

  const mockService = {
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: getModelToken(Conversation.name),
          useValue: mockService,
        },
      ],
    }).compile();

    conversationService = module.get<ConversationService>(ConversationService);
    service = module.get<Model<Conversation>>(getModelToken(Conversation.name));
  });
});
