import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInputDto {
  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
