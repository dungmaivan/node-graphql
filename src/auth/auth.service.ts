import { Injectable } from '@nestjs/common';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { email, password, userName } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authModel.create({
      email,
      userName,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.authModel.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
