import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login.dto';
import { SigupInputDto } from './dto/signup.dto';
import { Signup } from './models/signup.model';
import { Login } from './models/login.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // login

  @Mutation(() => Login)
  async login(@Args('login') userData: LoginInputDto) {
    return this.authService.login(userData);
  }

  // signup
  @Mutation(() => Signup)
  async signup(@Args('signup') userData: SigupInputDto) {
    return this.authService.signup(userData);
  }
}
