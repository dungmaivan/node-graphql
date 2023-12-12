import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.shema';
import mongoose from 'mongoose';
import { SigupInputDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInputDto } from './dto/login.dto';
import {MailerService} from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import e from 'express';
import { join } from 'path';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<Auth>,
    private jwtService: JwtService,
    private mailerServide: MailerService
  ) {}

  async signup(signupDto: SigupInputDto): Promise<{ token: string }> {
    const { email, password, username, role } = signupDto;
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
    
    return { token: token };
  }

  async login(loginInputDto: LoginInputDto): Promise<{ token: string }> {
    const { email, password } = loginInputDto;
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new Error('Not found user');
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Password is not correct');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token: token };
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

  getUserIdFromToken(token: string): string | undefined {
    const decodedToken = this.jwtService.decode(token);
    return decodedToken?.userId;
  }
}
