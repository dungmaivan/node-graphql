import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(
    @Body()
    user: SignupDto,
  ): Promise<{ token: string }> {
    return this.authService.signup(user);
  }

  @Post('/login')
  async login(
    @Body()
    user: LoginDto,
  ): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}
