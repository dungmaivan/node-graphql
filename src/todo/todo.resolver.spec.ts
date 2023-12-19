import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { CreateTodoInput } from './dto/create-todo.input';

const mockTodoService = {
  findAll: jest.fn(),
  create: jest.fn(),
  deleteTodo: jest.fn(),
  updateTodo: jest.fn(),
};

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoResolver,
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  const mockTodos: Todo[] = [
    {
      title: 'title',
      userId: '657574a21e35db77dda5b7f6',
      description: 'description',
      id: '657681ecba022feee159fd18',
      completed: false,
      endDate: new Date('2023-12-15T04:05:30.142+00:00'),
    },
  ];
  describe('todos', () => {
    it('should return an array of todos', async () => {
      // Mock data

      mockTodoService.findAll.mockResolvedValue(mockTodos);

      // Execute the resolver
      const result = await resolver.getAllTodos({
        count: 1,
        page: 1,
      });

      // Assertions
      expect(result).toEqual(mockTodos);
    });
  });
  describe('createTodo', () => {
    it('should create a new todo', async () => {
      // Mock data
      mockTodoService.create.mockResolvedValueOnce(mockTodos[0]);
      const newTood: CreateTodoInput = {
        title: 'title',
        userId: '657574a21e35db77dda5b7f6',
        description: 'description',
        completed: false,
        endDate: new Date('2023-12-15T04:05:30.142+00:00'),
      };
      // Execute the resolver
      const result = await resolver.createTodoData(newTood);

      // Assertions
      expect(result).toEqual(mockTodos[0]);
    });
  });
  describe('delete', () => {
    it('should delete a todo', async () => {
      // Mock data
      mockTodoService.deleteTodo.mockResolvedValueOnce(mockTodos[0]);

      // Execute the resolver
      const result = await resolver.deleteTodo('657681ecba022feee159fd18');

      // Assertions
      expect(result).toEqual(mockTodos[0]);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      // Mock data
      const updateTodoInput = {
        title: 'Updated Title',
        completed: true,
        endDate: new Date('2023-12-15T04:05:30.142+00:00'),
        _id: '657681ecba022feee159fd18',
        userId: '657574a21e35db77dda5b7f6',
        description: 'Updated Description',
      };
      mockTodoService.updateTodo.mockResolvedValueOnce(updateTodoInput);
      // Execute the resolver
      const result = await resolver.updateTodo(updateTodoInput);

      // Assertions
      expect(result).toEqual(updateTodoInput);
    });
  });
});
