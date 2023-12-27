import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UpdateTodoInput } from './dto/update-todo-input';
import { TodosArgs } from './dto/todos.args';

const PAGE_SIZE = 3;
@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}
  async create(data: CreateTodoInput) {
    const newTodo = await this.todoModel.create(data);
    return newTodo;
  }

  async findAll(data: TodosArgs): Promise<Todo[]> {
    const currentPage = data.page || 1;

    const keyword = data.keyword
      ? {
          $or: [
            {
              title: {
                $regex: data.keyword,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: data.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const skip = PAGE_SIZE * (currentPage - 1);
    return this.todoModel.find(keyword).limit(PAGE_SIZE).skip(skip);
  }
  async findById(id: string): Promise<Todo> {
    return this.todoModel.findById(id);
  }

  async deleteTodo(id: string): Promise<string> {
    try {
      await this.todoModel.findByIdAndDelete(id);
      return 'deleted';
    } catch (error) {
      return 'deleted error';
    }
  }
  async updateTodo(data: UpdateTodoInput): Promise<Todo> {
    const id = data._id;
    await this.todoModel.findByIdAndUpdate(id, data);
    const updatedTodo = this.todoModel.findById(id);
    return updatedTodo;
  }
}
