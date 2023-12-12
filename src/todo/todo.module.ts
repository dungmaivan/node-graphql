import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schema/todo.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindService } from './remind.service';
import { AuthSchema } from 'src/auth/schema/auth.shema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }, { name: 'Auth', schema: AuthSchema }]), ScheduleModule.forRoot()],
  providers: [TodoService, TodoResolver, RemindService],
})
export class TodoModule { }
