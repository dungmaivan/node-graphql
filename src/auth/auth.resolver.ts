import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login.dto';
import { SigupInputDto } from './dto/signup.dto';
import { Signup } from './models/signup.model';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.gurad';
import { Login } from './models/login.model';
import { ForgotPasswordRequest } from './models/verifyForgotPassword.model';
import { ChangePasswordDto } from './dto/changePasswordDto.dto';
import { CurrentUser } from './decorator/user.decorator.graphql';
// import { ForgotPasswordRequest } from './models/verifyForgotPassword.model';
// import { ChangePasswordDto } from './dto/changePasswordDto.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => String)
  async forgotPasswordRequest(
    @Args('forgotPasswordRequest') email: string,
  ) {
    return this.authService.forgotPasswordRequest(email);
  }

  @Mutation(() => ForgotPasswordRequest)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser()  user,
    @Args('changePassword') changePasswordData: ChangePasswordDto
  ) {
    console.log(user, 'user');
    
    return this.authService.changePassword( changePasswordData, user._id)
  }

  @Mutation(() => Login)
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
