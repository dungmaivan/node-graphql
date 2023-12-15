import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.shema';
import mongoose from 'mongoose';
import { SigupInputDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInputDto } from './dto/login.dto';
import {MailerService} from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { Login } from './models/login.model';
import { ForgotPasswordRequest } from './models/verifyForgotPassword.model';
import { ChangePasswordDto } from './dto/changePasswordDto.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<Auth>,
    private jwtService: JwtService,
    private mailerServide: MailerService
  ) {}

  async signup(signupDto: SigupInputDto): Promise<{ token: string, message: string }> {
    const { email, password, username, role } = signupDto;
    const  userAlreadyExists = await this.authModel.findOne({ email });
    if(userAlreadyExists) {
       throw new HttpException('Email already exists', 400)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
    ejs.renderFile( 'src/templates/email/welcome.ejs',  {username: user.username}).then(data => {
      this.mailerServide.sendMail({
        to: email,
        subject: 'Welcome to my app',
        html: data
      })
    })
    const token = this.jwtService.sign({ id: user._id });
    
    return { token: token, message: 'Signup Success' };
  }

  async login(loginInputDto: LoginInputDto): Promise< Login> {
    const { email, password } = loginInputDto;
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new Error('Not found user');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Password is not correct');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token: token, message: 'Login success' };
  }

  getUserIdFromToken(token: string): string | undefined {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken?.userId;
  }

  async changePassword(changePassworddata: ChangePasswordDto, id: string): Promise<{message: string}> {
    if(!id) {
      throw new HttpException('Invalid token', 400);
    
    }
    const user = await this.authModel.findById(id)
    if(!user) {
      throw new HttpException('Not found user', 400);
    
    }
    user.password = await bcrypt.hash(changePassworddata.password, 10);
    await user.save();
    return {message: 'Change password success'}
  }

  async forgotPasswordRequest(email: string): Promise<string> {
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new HttpException('Not found user', 400);
    }
    const token = this.jwtService.sign({ id: user._id });
    ejs.renderFile( 'src/templates/email/reset-password.ejs',  {username: user.username, token: token}).then(data => {
      this.mailerServide.sendMail({
        to: email,
        subject: 'Reset password',
        html: data
      })
    })
    return  'Sended email reset password sucess'
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

  
}
