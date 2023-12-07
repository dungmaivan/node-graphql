import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}
  async create(data: CreateTodoInput) {
    console.log(
      '🚀 ~ file: todo.service.ts:14 ~ TodoService ~ create ~ data:',
      data,
    );
    const newTodo = this.todoModel.create(data);

    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find();
  }
}
