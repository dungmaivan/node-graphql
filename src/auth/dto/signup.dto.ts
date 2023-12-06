import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../schemas/auth.schema';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Name have more than 6 charactor' })
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  role: Role;
}
