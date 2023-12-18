import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from 'src/interface/jobData';

@Injectable()
export class EmailServiceRemind {
  constructor(
    @InjectQueue('emailSendingRemind')
    private readonly emailSendingRemind: Queue,
  ) {}

  async sendReindEmail(data: Mail) {
    const job = await this.emailSendingRemind.add('remind', { data });

    return { jobId: job.id };
  }
}
