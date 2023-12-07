import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async addTodo(@Args('createTodoData') createTodoData: CreateTodoInput) {
    const todo = await this.todoService.create(createTodoData);
    return todo;
  }
}
