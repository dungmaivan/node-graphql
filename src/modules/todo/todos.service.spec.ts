import { Model } from 'mongoose';
import { TodoService } from './todo.service';
import { Todo } from './schema/todo.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateTodoInput } from './dto/create-todo.input';

describe('todoService', () => {
  let todoService: TodoService;
  let service = Model<Todo>;

  const mockTodoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
    findById: jest.fn(),
    updateTodo: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoService,
        },
      ],
    }).compile();
    todoService = module.get<TodoService>(TodoService);
    service = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  const mocktodo = [
    {
      title: 'title',
      userId: '657574a21e35db77dda5b7f6',
      description: 'description',
      id: '657681ecba022feee159fd18',
      completed: false,
    },
  ];
  const mockParam = {
    count: 1,
    page: 1,
    keyword: '',
  };

  mockTodoService.find.mockReturnValueOnce({
    limit: jest.fn().mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce(mocktodo),
    }),
  });
  const mockDeletedTodo = 'deleted';

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('shoule create todo and return a todo', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() => Promise.resolve(mocktodo));
      const result = await todoService.create(
        mocktodo[0] as unknown as CreateTodoInput,
      );
      expect(result).toEqual(mocktodo);
    });
  });

  describe('findById', () => {
    it('should find by ID', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mocktodo);
      const result = await todoService.findById('657681ecba022feee159fd18');
      expect(result).toEqual(mocktodo);
    });
  });

  describe('find all', () => {
    it('find all', async () => {
      const result = await todoService.findAll(mockParam);
      expect(result).toEqual(mocktodo);
    });
  });

  describe('delete', () => {
    it('delete a todo by ID', async () => {
      jest
        .spyOn(service, 'findByIdAndDelete')
        .mockResolvedValueOnce([mocktodo[0].id]);
      const result = await todoService.deleteTodo('657681ecba022feee159fd18');
      expect(result).toEqual(mockDeletedTodo);
    });
  });
});
