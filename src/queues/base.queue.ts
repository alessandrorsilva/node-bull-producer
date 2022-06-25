import * as Bull from 'bull';
//import e from 'express';
import { Queues } from '../enums';
import configs from '../configs';

export default class BaseQueue {
  queue: Bull.Queue;

  constructor(queue: Queues) {
    this.queue = new Bull(queue, {
      redis: configs.redis,
      prefix: 'bull',
      settings: {
        retryProcessDelay: 5000
      },
    });

    this.queue.on('failed', this.failed);
    this.queue.on('completed', this.completed);
    this.queue.on('error', (error) => {
      console.error(`Falha nas taskd, verifique suas configurações: ${error}`)
    });
  }

  protected failed(job, err) {
    console.error(
      `Queue [${job.queue.name}] - ${JSON.stringify(job.data)} - Id ${job.id
      } has been failed, by de reason: ${job.failedReason}`,
    );
    console.error(err);
  }

  protected completed(job) {
    console.log(
      `Queue [${job.queue.name}] - ${JSON.stringify(job.data)} - Id ${job.id
      } has been completed`,
    );
  }

  add(body: any, opts?: Bull.JobOptions) {
    return this.queue.add(
      body,
      opts || {
        attempts: 5,
        delay: 2000,
        removeOnFail: false,
        backoff: 5000,
      }
    )
  }
}