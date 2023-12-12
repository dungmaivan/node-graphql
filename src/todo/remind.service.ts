import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import mongoose from 'mongoose';
import { Todo } from './models/todo.model';
import { Auth } from 'src/auth/schema/auth.shema';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';

@Injectable()
export class RemindService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: mongoose.Model<Todo>,
        @InjectModel(Auth.name)
        private userModel: mongoose.Model<Auth>,
        private mailerServide: MailerService
    ) { }

    @Cron('0 0 0 * * *')
    async handleCron() {
        const listTaskRemind = await this.todoModel.find({ completed: false, endDate: { $lte: new Date() } })
        if (listTaskRemind.length === 0) return
        listTaskRemind.forEach(async (task) => {
            const user = await this.userModel.findById(task.userId)
            if (!user) return
            ejs.renderFile('src/templates/email/remind.ejs', { username: user.username, endDate: task.endDate, title: task.title, description: task.description, }).then(data => {
                this.mailerServide.sendMail({
                    to: user.email,
                    subject: 'You have a task need to completed',
                    html: data
                })
            })
        })
    }
}