import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schema/todo.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindService } from './remind.service';
import { BullModule } from '@nestjs/bull';
import { UserSchema } from 'src/modules/user/schema/user.shema';
import { EmailSendRemindProcessor } from 'src/lib/send-email-service/emailRemind/email-remind.processor';
import { EmailServiceRemind } from 'src/lib/send-email-service/emailRemind/email-remind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todo', schema: TodoSchema },
      { name: 'User', schema: UserSchema },
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
