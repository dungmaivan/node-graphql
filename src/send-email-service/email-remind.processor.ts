import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from '../interface/jobData';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';

@Processor('emailSendingRemind')
export class EmailSendRemindProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('remind')
  async sendReindEmail(job: Job<Mail>) {
    const { data } = job.data;
    ejs
      .renderFile('src/templates/email/remind.ejs', {
        username: data.username,
        endDate: data.endDate,
        title: data.title,
        description: data.description,
        token: data.token,
      })
      .then((html) => {
        this.mailService.sendMail({
          to: data.email,
          subject: 'Remind task need to complete',
          html: html,
        });
      });
  }
}
