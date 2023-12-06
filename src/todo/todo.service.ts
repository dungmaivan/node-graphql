import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Auth } from 'src/auth/schemas/auth.schema';
const PAGE_SIZE = 3;
@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Todo[]> {
    const currentPage = Number(query.page) || 1;
    const keyword = query.keyword
      ? {
          $or: [
            {
              title: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    const skip = PAGE_SIZE * (currentPage - 1);
    const todos = await this.todoModel
      .find(keyword)
      .limit(PAGE_SIZE)
      .skip(skip);

    return todos;
  }

  async create(todo: Todo, user: Auth): Promise<Todo> {
    const data = Object.assign(todo, { user: user._id });
    const todos = await this.todoModel.create(data);
    return todos;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const todos = await this.todoModel.findByIdAndUpdate(id, todo);
    return todos;
  }

  async findOne(id: string): Promise<Todo> {
    const isInvalidid = mongoose.isValidObjectId(id);
    if (!isInvalidid) {
      throw new BadRequestException('Invalid id');
    }
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new BadRequestException('Not found');
    }
    return todo;
  }
  async delete(id: string): Promise<string> {
    const result = await this.todoModel.findByIdAndDelete(id);
    if (!result) {
      return 'Not found';
    }
    return 'Delete success';
  }
}
