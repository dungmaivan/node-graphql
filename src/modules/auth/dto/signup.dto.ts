import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Role } from '../../user/schema/user.shema';

@InputType()
export class SigupInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @Length(30, 255)
  @IsEmail({}, { message: 'Please enter correct email' })
  email?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Password least 10 character' })
  password: string;

  @Field()
  @IsOptional()
  role: Role;

  @Field({ defaultValue: false })
  @IsBoolean()
  IsPremium: boolean;
}
