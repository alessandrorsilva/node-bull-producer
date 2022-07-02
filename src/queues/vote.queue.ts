import { Queues } from '../enums';
import BaseQueue from './base.queue';

/**
 * Classe Singleton
 */
export default class VoteQueue extends BaseQueue {
  private static instance: VoteQueue;
  public static getInstance(): VoteQueue {
    if (!VoteQueue.instance) {
      VoteQueue.instance = new VoteQueue();
    }
    return VoteQueue.instance;
  }

  /**
   * Colocamos como private para impedir a instância via new
   */
  private constructor() {
    super(Queues.vote);
  }
}