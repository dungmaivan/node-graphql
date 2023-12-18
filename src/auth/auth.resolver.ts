import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login.dto';
import { SigupInputDto } from './dto/signup.dto';
import { Signup } from './models/signup.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.gurad';
import { Login } from './models/login.model';
import { ForgotPasswordRequest } from './models/verify-forgot-password.model';
import { CurrentUser } from './decorator/user.decorator.graphql';
import { ActiveAccount } from './models/active-account.model';
import { ResetPasswordRequest } from './models/reset-password.model';
import { ResetPasswordDto } from './dto/reset-password.dto';
// import { ForgotPasswordRequest } from './models/verifyForgotPassword.model';
// import { ChangePasswordDto } from './dto/changePasswordDto.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // send email to request reset password
  @Mutation(() => String)
  async forgotPasswordRequest(@Args('forgotPasswordRequest') email: string) {
    return this.authService.forgotPasswordRequest(email);
  }

  // changePassword
  @Mutation(() => ForgotPasswordRequest)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() user,
    @Args('changePassword') resetPasswordData: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(resetPasswordData, user._id);
  }
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

  // deleteAccount
  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Args('id') id: string) {
    return this.authService.delete(id);
  }

  // active account
  @Mutation(() => ActiveAccount)
  @UseGuards(JwtAuthGuard)
  async activeAccount(@CurrentUser() user) {
    return this.authService.activeAccount(user._id);
  }

  @Mutation(() => ResetPasswordRequest)
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @CurrentUser() user,
    @Args('ResetPasswordDto') resetPasswordData: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(resetPasswordData, user._id);
  }
}
