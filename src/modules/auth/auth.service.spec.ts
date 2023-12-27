import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { EmailWelcomeService } from '../../lib/send-email-service/emailWelcom/email-welcome.service';
import { BullModule } from '@nestjs/bull';
import { User } from '../user/schema/user.shema';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { EmailService } from '../../lib/send-email-service/emailResetPassword/email.service';
import * as bcrypt from 'bcryptjs';
import {
  loginData,
  mockLoginSuccess,
  mockMessageSignupSuccess,
  mockSignupData,
  mockUserActived,
  mockUserUnactive,
} from './mock';
describe('authService', () => {
  let authService: AuthService;
  let service = Model<User>;
  let jwtService: JwtService;

  const mockAuthService = {
    signup: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'emailSending',
        }),
        BullModule.registerQueue({
          name: 'emailWelcomeSending',
        }),
      ],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
        AuthService,
        JwtService,
        EmailService,
        EmailWelcomeService,
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should signup success', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(service, 'create').mockResolvedValue([mockUserUnactive]);
      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(
          '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
        );
      const result = await authService.signup(mockSignupData);
      expect(result).toEqual(mockMessageSignupSuccess);
    });
  });

  describe('login', () => {
    it('should login success', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUserActived);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(
          '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
        );
      const result = await authService.login(loginData);
      expect(result).toEqual(mockLoginSuccess);
    });
    it('should login error cause unactive account', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUserUnactive);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(
          '$2a$10$sRp1eI5rZxHvOqJnc3FtWeOdl4p.MZev3oFsBxJ0ui9A4Fj2s5ZLe',
        );
      try {
        await authService.login(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
