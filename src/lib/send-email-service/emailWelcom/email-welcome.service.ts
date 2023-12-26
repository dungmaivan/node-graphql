import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from '../../interface/jobData';

@Injectable()
export class EmailWelcomeService {
  constructor(
    @InjectQueue('emailWelcomeSending') private readonly emailQueue: Queue,
  ) {}

  async sendWelcomeEmail(data: Mail) {
    const job = await this.emailQueue.add('welcome', { data });
    return { jobId: job.id };
  }
}
