import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import {
  loginData,
  mockLoginSuccess,
  mockSignupData,
  mockUserUnactive,
} from './mock';

const mockUserService = {
  login: jest.fn(),
  signup: jest.fn(),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthResolver,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe(' login', () => {
    it('should return login success', async () => {
      // Mock data

      mockUserService.login.mockResolvedValue(mockLoginSuccess);

      // Execute the resolver
      const result = await resolver.login(loginData);

      // Assertions
      expect(result).toEqual(mockLoginSuccess);
    });
  });

  describe(' signup', () => {
    it('should return signup success', async () => {
      // Mock data

      mockUserService.signup.mockResolvedValue(mockUserUnactive);

      // Execute the resolver
      const result = await resolver.signup(mockSignupData);

      // Assertions
      expect(result).toEqual(mockUserUnactive);
    });
  });
});
