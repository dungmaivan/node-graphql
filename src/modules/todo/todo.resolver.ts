import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo-input';
import { TodosArgs } from './dto/todos.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../lib/guards/auth.gurad';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async getAllTodos(
    @Args('getAllTodo') getAllTodoData: TodosArgs,
  ): Promise<Todo[]> {
    return this.todoService.findAll(getAllTodoData);
  }

  @Query(() => Todo)
  async getOneTodo(@Args('id') id: string): Promise<Todo> {
    return this.todoService.findById(id);
  }

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  async createTodoData(
    @Args('createTodoData') createTodoData: CreateTodoInput,
  ) {
    const todo = await this.todoService.create(createTodoData);
    return todo;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Args('id') id: string) {
    const todo = await this.todoService.deleteTodo(id);
    return todo;
  }

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Args('todo') updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoService.updateTodo(updateTodoInput);
    return todo;
  }
}
