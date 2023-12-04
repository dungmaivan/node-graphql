import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodo } from './dto/create-todo';
import { Query as ExpressQuery } from 'express-serve-static-core';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(
    @Query()
    query: ExpressQuery,
  ): Promise<Todo[]> {
    return this.todoService.findAll(query);
  }

  @Get(':id')
  async findByid(
    @Param('id')
    id: string,
  ): Promise<Todo> {
    return this.todoService.findOne(id);
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
