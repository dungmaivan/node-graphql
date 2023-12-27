import { Model } from 'mongoose';
import { User } from './schema/user.shema';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from '../../lib/send-email-service/emailResetPassword/email.service';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

describe('userService', () => {
  let userService: UserService;
  let service = Model<User>;

  const mockUserService = {
    activeAccount: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndDelete: jest.fn(),
    forgotPasswordRequest: jest.fn(),
    changePassword: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'emailSending',
        }),
        JwtModule.registerAsync({
          useFactory: () => {
            return {
              secret: 'DUNG_MIKE',
              signOptions: {
                expiresIn: '1h',
              },
            };
          },
        }),
      ],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
        JwtService,
        EmailService,
        ConfigService,
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    service = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const mockUser = {
    id: '658a55eee688a8c31c70f958',
    role: 'boss',
    username: 'Mr Mai',
    email: 'gotrudukna@gufum.com',
    password: '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
    active: false,
    createdAt: '2023-12-26T04:26:22.060+00:00',
    updatedAt: '2023-12-26T04:26:22.060+00:00',
  };

  const mockrResetPasswordData = {
    newPassword: '123456',
  };

  const mockrChangePasswordData = {
    oldPassword: '123456',
    newPassword: '123457',
  };
  const mockrChangePasswordDataError = {
    oldPassword: 'wrongPassword',
    newPassword: '123457',
  };

  mockUserService.changePassword.mockReturnValueOnce({
    findById: jest.fn().mockReturnValueOnce({
      save: jest
        .fn()
        .mockReturnValueOnce({ message: 'Change password success' }),
    }),
  });
  mockUserService.forgotPasswordRequest.mockReturnValueOnce({
    findOne: jest.fn().mockReturnValueOnce({
      mockUser,
    }),
    token: jest
      .fn()
      .mockReturnValueOnce(
        'We had sended email reset password success, please check email to reset password',
      ),
  });

  describe('activeAccount', () => {
    it('should activeAccount success', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue({ save: jest.fn() });
      const result = await userService.activeAccount(mockUser.id);
      expect(result).toEqual({ message: 'Active account success' });
    });
  });

  describe('delete', () => {
    it('should delete account ', async () => {
      jest.spyOn(service, 'findByIdAndDelete').mockResolvedValue(mockUser);
      const result = await userService.delete(mockUser.email);
      expect(result).toEqual('Delete user success');
    });
  });

  describe('resetPassword', () => {
    it('should resetPassword success', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue({ save: jest.fn() });
      const result = await userService.resetPassword(
        mockrResetPasswordData,
        mockUser.id,
      );
      expect(result).toEqual({ message: 'Reset password success' });
    });
  });
  describe('changePassword', () => {
    it('should changePassword success', async () => {
      const result = await userService.changePassword(
        mockrChangePasswordData,
        mockUser.id,
      );
      expect(result).toEqual({ message: 'Change password success' });
    });
    it('should changePassword error', async () => {
      const result = await userService.changePassword(
        mockrChangePasswordDataError,
        mockUser.id,
      );
      expect(result).toEqual({ message: 'Old password is not correct' });
    });
  });

  // describe('forgotPasswordRequest', () => {
  //   it('should show send email success', async () => {
  //     const result = await userService.forgotPasswordRequest(mockUser.email);
  //     expect(result).toEqual(
  //       'We had sended email reset password success, please check email to reset password',
  //     );
  //   });
  // });
});
