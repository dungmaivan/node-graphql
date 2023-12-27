import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

const mockUserService = {
  activeAccount: jest.fn(),
  changePassword: jest.fn(),
  deleteAccount: jest.fn(),
  forgotPasswordRequest: jest.fn(),
  resetPasswordRequest: jest.fn(),
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserResolver,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  const mockUser = {
    id: '658a55eee688a8c31c70f958',
    role: 'boss',
    username: 'Mr Mai',
    email: 'gotrudukna@gufum.com',
    password: '$2a$10$TmGubXwE6VNF.tTg0Zs5wervj0.V4d/rwNvnuBJQkwx.aAiyR6HLG',
    active: false,
    createdAt: '2023-12-26T04:26:22.060+00:00',
    updatedAt: '2023-12-26T04:26:22.060+00:00',
  };
  const mockActiveAccess = { message: 'Active account success' };
  const mockChangePasswordSuccess = { message: 'Change password success' };
  const mockDeleteSuccess = 'Delete user success';
  const mockSendEmailResetPasswordSuccess =
    'We had sended email reset password success, please check email to reset password';
  const mockMessageResetPasswordSuccess = {
    message: 'Reset password success',
  };
  describe('active account', () => {
    it('should return a message active account success', async () => {
      // Mock data

      mockUserService.activeAccount.mockResolvedValue(mockActiveAccess);

      // Execute the resolver
      const result = await resolver.activeAccount(mockUser);

      // Assertions
      expect(result).toEqual(mockActiveAccess);
    });
  });

  describe('changePassword', () => {
    it('should return a message change password success ', async () => {
      // Mock data

      mockUserService.changePassword.mockResolvedValue(
        mockChangePasswordSuccess,
      );
      // Execute the resolver
      const result = await resolver.changePassword(mockUser, {
        oldPassword: '123456',
        newPassword: '654321',
      });

      // Assertions
      expect(result).toEqual(mockChangePasswordSuccess);
    });
  });

  describe('delete account', () => {
    it('should return a message delete account success ', async () => {
      // Mock data

      mockUserService.deleteAccount.mockResolvedValue(mockDeleteSuccess);
      // Execute the resolver
      const result = await resolver.deleteAccount(mockUser.id);

      // Assertions
      expect(result).toEqual(mockDeleteSuccess);
    });
  });

  describe('forgot Password Request password', () => {
    it('should return a message sended email to reset password ', async () => {
      // Mock data

      mockUserService.forgotPasswordRequest.mockResolvedValue(
        mockSendEmailResetPasswordSuccess,
      );
      // Execute the resolver
      const result = await resolver.forgotPasswordRequest(mockUser.email);

      // Assertions
      expect(result).toEqual(mockSendEmailResetPasswordSuccess);
    });
  });

  describe('reset password', () => {
    it('should return a message sended email to reset password ', async () => {
      // Mock data

      mockUserService.resetPasswordRequest.mockResolvedValue(
        mockMessageResetPasswordSuccess,
      );
      // Execute the resolver
      const result = await resolver.resetPasswordRequest(mockUser, {
        newPassword: '654321',
      });

      // Assertions
      expect(result).toEqual(mockMessageResetPasswordSuccess);
    });
  });
});
