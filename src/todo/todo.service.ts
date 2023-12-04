import { Injectable } from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoModel.find();
    return todos;
  }
  async create(todo: Todo): Promise<Todo> {
    const todos = await this.todoModel.create(todo);
    return todos;
  }
  async update(id: string, todo: Todo): Promise<Todo> {
    const todos = await this.todoModel.findByIdAndUpdate(id, todo);
    return todos;
  }
  async delete(id: string): Promise<string> {
    const result = await this.todoModel.findByIdAndDelete(id);
    if (!result) {
      return 'Not found';
    }
    return 'Delete success';
  }
}
