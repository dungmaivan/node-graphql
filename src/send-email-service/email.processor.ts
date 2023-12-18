import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from '../interface/jobData';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job.data;

    ejs
      .renderFile('src/templates/email/welcome.ejs', {
        username: data.username,
        token: data.token,
      })
      .then((html) => {
        this.mailService.sendMail({
          to: data.email,
          subject: 'Welcome',
          html: html,
        });
      });
  }

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job.data;
    ejs
      .renderFile('src/templates/email/reset-password.ejs', {
        username: data.username,
        token: data.token,
      })
      .then((html) => {
        this.mailService.sendMail({
          to: data.email,
          subject: 'Reset password',
          html: html,
        });
      });
  }
}
