import mongoose, { Model } from "mongoose";
import { TodoService } from "./todo.service";
import { Todo } from "./schema/todo.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CreateTodoInput } from "./dto/create-todo.input";
import { TodosArgs } from "./dto/todos.args";


describe('todoService', () => {
    let todoService: TodoService
    let model = Model<Todo>

    const mockTodoService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        updateTodo: jest.fn(),
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TodoService, {
                provide: getModelToken(Todo.name),
                useValue: mockTodoService,
            }]
        }).compile();
        todoService = module.get<TodoService>(TodoService)
        model = module.get<Model<Todo>>(getModelToken(Todo.name))
    })


    const mocktodo = [{
        title: "title",
        userId: "657574a21e35db77dda5b7f6",
        description: "description",
        id: "657681ecba022feee159fd18",
        completed: false
    }]


    describe('create', () => {
        it('shoule create todo and return a todo', async () => {

            jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(
                mocktodo
            ))
            const result = await todoService.create(mocktodo[0] as unknown as CreateTodoInput)
            expect(result).toEqual(mocktodo)
        })
    })
    describe('findById', () => {
        it('should find by ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mocktodo)
            const result = await todoService.findById('657681ecba022feee159fd18')
            expect(result).toEqual(mocktodo)
        })
    })

});
