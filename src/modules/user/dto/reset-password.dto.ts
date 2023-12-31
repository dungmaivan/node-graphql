import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
