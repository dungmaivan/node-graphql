import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.shema';
import mongoose from 'mongoose';
import { SigupInputDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInputDto } from './dto/login.dto';
// import * as ejs from 'ejs';
import { Login } from './models/login.model';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequest } from './models/reset-password.model';
import { EmailService } from 'src/send-email-service/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<Auth>,
    private jwtService: JwtService,
    // private mailerServide: MailerService,
    private emailService: EmailService,
  ) {}

  async signup(signupDto: SigupInputDto): Promise<{ message: string }> {
    const { email, password, username, role } = signupDto;
    const userAlreadyExists = await this.authModel.findOne({ email });
    if (userAlreadyExists) {
      throw new HttpException('Email already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role,
      active: false,
    });
    const token = this.jwtService.sign({ id: user._id });
    const data = {
      email: email,
      subject:
        'Welcome to my app, please click the link below to active account',
      token: token,
      username: username,
    };
    this.emailService.sendWelcomeEmail(data);

    return { message: 'Signup Success' };
  }

  async activeAccount(id: string): Promise<{ message: string }> {
    const user = await this.authModel.findById(id);
    if (!user) {
      throw new Error('Not found user');
    }
    user.active = true;
    await user.save();
    return { message: 'Active account success' };
  }

  async login(loginInputDto: LoginInputDto): Promise<Login> {
    const { email, password } = loginInputDto;
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new Error('Not found user');
    }
    if (!user.active) {
      throw new Error(
        'User is not active, please check email and click the link to active account',
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Password is not correct');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token: token, message: 'Login success' };
  }

  async forgotPasswordRequest(email: string): Promise<string> {
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new HttpException('Not found user', 400);
    }
    const token = this.jwtService.sign({ id: user._id });
    const data = {
      email: email,
      subject:
        'Welcome to my app, please click the link below to active account',
      token: token,
      username: user.username,
    };
    this.emailService.sendResetPasswordEmail(data);
    return 'We had sended email reset password success, please check email to reset password';
  }
  async delete(id: string): Promise<string> {
    try {
      const user = await this.authModel.findByIdAndDelete(id);
      if (!user) {
        return 'Not found user';
      }
      return 'Delete user success';
    } catch (error) {
      return 'Delete user error';
    }
  }

  async resetPassword(
    resetPasswordData: ResetPasswordDto,
    id: string,
  ): Promise<ResetPasswordRequest> {
    try {
      const user = await this.authModel.findById(id);
      if (!user) {
        return { message: 'Not found user' };
      }
      const isMatch = await bcrypt.compare(
        resetPasswordData.oldPassword,
        user.password,
      );
      if (!isMatch) {
        return { message: 'Old password is not correct' };
      }
      user.password = await bcrypt.hash(resetPasswordData.newPassword, 10);
      await user.save();
      return { message: 'Reset password success' };
    } catch (error) {
      return { message: 'Reset password error' };
    }
  }
}
