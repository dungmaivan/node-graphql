import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login.dto';
import { SigupInputDto } from './dto/signup.dto';
import { Signup } from './models/signup.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.gurad';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Signup)
  async login(@Args('login') userData: LoginInputDto) {
    return this.authService.login(userData);
  }

  @Mutation(() => Signup)
  async signup(@Args('signup') userData: SigupInputDto) {
    return this.authService.signup(userData);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Args('id') id: string) {
    return this.authService.delete(id);
  }
}
