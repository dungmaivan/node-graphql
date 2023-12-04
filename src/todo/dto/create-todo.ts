import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodo {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly completed: boolean;
}
