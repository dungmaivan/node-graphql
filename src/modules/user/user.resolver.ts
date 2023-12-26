import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { ActiveAccount } from './models/active-account.model';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from 'src/lib/guards/auth.gurad';
import { ChangePasswordInputDto } from './dto/changePasswordInputDto.dto';
import { ChangePasswordResponse } from './models/reset-password.model';
import { CurrentUser } from 'src/lib/decorator/user.decorator.graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: UserService) {}

  // send email to request reset password
  @Mutation(() => String)
  async forgotPasswordRequest(@Args('forgotPasswordRequest') email: string) {
    return this.authService.forgotPasswordRequest(email);
  }

  // forgot Password => send request to reset pasword
  @Mutation(() => ChangePasswordResponse)
  @UseGuards(JwtAuthGuard)
  async resetPasswordRequest(
    @CurrentUser() user,
    @Args('changePassword') resetPasswordData: ResetPasswordDto,
  ): Promise<ChangePasswordResponse> {
    return this.authService.resetPassword(resetPasswordData, user._id);
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
  // change password
  @Mutation(() => ChangePasswordResponse)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() user,
    @Args('changePasswordInputDto')
    changePasswordInputData: ChangePasswordInputDto,
  ) {
    return this.authService.changePassword(changePasswordInputData, user._id);
  }
}
