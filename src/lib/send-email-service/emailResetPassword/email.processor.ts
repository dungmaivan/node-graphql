import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { Mail } from '../../interface/jobData';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job.data;
    ejs
      .renderFile('src/lib/templates/email/reset-password.ejs', {
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
