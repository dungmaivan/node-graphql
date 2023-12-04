import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodo } from './dto/create-todo';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async createTodo(
    @Body()
    todo: CreateTodo,
  ): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id')
    id: string,
    @Body()
    todo: CreateTodo,
  ): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.todoService.delete(id);
  }
}
