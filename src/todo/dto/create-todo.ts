import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Auth } from 'src/auth/schemas/auth.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly completed: boolean;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: Auth;
}
