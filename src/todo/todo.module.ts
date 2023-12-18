import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schema/todo.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindService } from './remind.service';
import { AuthSchema } from 'src/auth/schema/auth.shema';
import { BullModule } from '@nestjs/bull';
import { EmailSendRemindProcessor } from 'src/send-email-service/email-remind.processor';
import { EmailServiceRemind } from 'src/send-email-service/email-remind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'Auth', schema: AuthSchema },
    ]),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'emailSendingRemind',
    }),
  ],
  providers: [
    TodoService,
    TodoResolver,
    RemindService,
    EmailSendRemindProcessor,
    EmailServiceRemind,
  ],
})
export class TodoModule {}
