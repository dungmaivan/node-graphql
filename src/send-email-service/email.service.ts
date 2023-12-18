import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from 'src/interface/jobData';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('emailSending') private readonly emailQueue: Queue,
  ) {}

  async sendWelcomeEmail(data: Mail) {
    const job = await this.emailQueue.add('welcome', { data });
    return { jobId: job.id };
  }

  async sendResetPasswordEmail(data: Mail) {
    const job = await this.emailQueue.add('reset-password', { data });

    return { jobId: job.id };
  }
  // async sendReindEmail(data: Mail) {
  //   const job = await this.emailSendingRemind.add('remind', { data });
  //   console.log(
  //     '🚀 ~ file: email.service.ts:28 ~ EmailService ~ sendReindEmail ~ data:',
  //     data,
  //   );

  //   return { jobId: job.id };
  // }
}
