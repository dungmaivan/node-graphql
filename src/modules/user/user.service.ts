import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.shema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import * as ejs from 'ejs';
import { EmailService } from 'src/lib/send-email-service/emailResetPassword/email.service';
import { ChangePasswordResponse } from './models/reset-password.model';
import { ChangePasswordInputDto } from './dto/changePasswordInputDto.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private authModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async activeAccount(id: string): Promise<{ message: string }> {
    const user = await this.authModel.findById(id);
    if (!user) {
      throw new Error('Not found user');
    }
    user.active = true;
    await user.save();
    return { message: 'Active account success' };
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

  async changePassword(
    resetPasswordData: ChangePasswordInputDto,
    id: string,
  ): Promise<ChangePasswordResponse> {
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
      return { message: 'Change password success' };
    } catch (error) {
      return { message: 'Change password error' };
    }
  }

  async resetPassword(
    resetPasswordData: ResetPasswordDto,
    id: string,
  ): Promise<ChangePasswordResponse> {
    console.log(
      '🚀 ~ file: user.service.ts:88 ~ UserService ~ resetPasswordData:',
      resetPasswordData,
    );

    const user = await this.authModel.findById(id);
    if (!user) {
      return { message: 'Not found user' };
    }
    user.password = await bcrypt.hash(resetPasswordData.newPassword, 10);
    await user.save();
    const result: ChangePasswordResponse = {
      message: 'Reset password success',
    };
    return result;
  }
}
