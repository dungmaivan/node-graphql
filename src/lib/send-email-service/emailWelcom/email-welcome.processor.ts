import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { Mail } from '../../interface/jobData';

@Processor('emailWelcomeSending')
export class EmailWelcomeProcessor {
  constructor(private readonly mailService: MailerService) {}

  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job.data;

    ejs
      .renderFile('src/lib/templates/email/welcome.ejs', {
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
}
