import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import mongoose from 'mongoose';
import { Todo } from './models/todo.model';
import { User } from 'src/modules/user/schema/user.shema';
import { EmailServiceRemind } from 'src/lib/send-email-service/emailRemind/email-remind.service';

@Injectable()
export class RemindService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private emailServiceRemind: EmailServiceRemind,
  ) {}
  //  send remind task is overdue on 00:am every day
  @Cron('0 0 0 * * *')
  async handleCron() {
    const listTaskRemind = await this.todoModel.find({
      completed: false,
      endDate: { $lte: new Date() },
    });
    if (listTaskRemind.length === 0) return;
    listTaskRemind.forEach(async (task) => {
      const user = await this.userModel.findById(task.userId);
      if (!user) return;
      const data = {
        username: user.username,
        endDate: task.endDate,
        title: task.title,
        description: task.description,
        email: user.email,
        subject: 'You have a task need to completed',
      };

      this.emailServiceRemind.sendReindEmail(data);
    });
  }
}
