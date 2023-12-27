import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SigupInputDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInputDto } from './dto/login.dto';
// import * as ejs from 'ejs';
import { Login } from './models/login.model';
import { User } from '../../modules/user/schema/user.shema';
import { EmailWelcomeService } from '../../lib/send-email-service/emailWelcom/email-welcome.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private emailWelcomeService: EmailWelcomeService,
  ) {}

  async signup(signupDto: SigupInputDto): Promise<{ message: string }> {
    const { email, password, username, role } = signupDto;
    const userAlreadyExists = await this.userModel.findOne({ email });
    if (userAlreadyExists) {
      throw new HttpException('Email already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
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
    this.emailWelcomeService.sendWelcomeEmail(data);

    return {
      message:
        'Signup Success, please click the link on your email to active account',
    };
  }

  async login(loginInputDto: LoginInputDto): Promise<Login> {
    const { email, password } = loginInputDto;
    const user = await this.userModel.findOne({ email });
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
}
