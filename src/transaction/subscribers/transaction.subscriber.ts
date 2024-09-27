import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  DataSource,
} from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from 'src/commons/enums/transaction-status';

@EventSubscriber()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction>
{
  private readonly BATCH_SIZE = 100;
  private readonly TRANSACTION_THRESHOLD = 50000;
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Transaction;
  }

  async afterInsert(event: InsertEvent<Transaction>): Promise<void> {
    const userId = event.entity.User.id;

    const transactionCount = await event.manager.count(Transaction, {
      where: {
        User: {
          id: userId,
        },
        status: TransactionStatus.PENDING || TransactionStatus.APPROVED,
      },
    });

    console.log({ transactionCount });

    if (transactionCount >= this.TRANSACTION_THRESHOLD) {
      await this.updateTransactionStatusInBatches(event.manager, userId);
    }
  }

  private async updateTransactionStatusInBatches(
    manager: any,
    userId: string,
  ): Promise<void> {
    let updatedCount = 0;
    const promises: Promise<any>[] = [];

    while (true) {
      const result = manager
        .createQueryBuilder()
        .update(Transaction)
        .set({ status: TransactionStatus.REJECTED })
        .where('UserId = :userId', { userId })
        .andWhere('status != :status', { status: TransactionStatus.REJECTED })
        .take(this.BATCH_SIZE)
        .execute();

      promises.push(result);
      updatedCount += result.affected || 0;

      if (result.affected === 0) {
        break;
      }
    }

    await Promise.all(promises);

    console.log(
      `Total updated transactions for user ${userId}: ${updatedCount}`,
    );
  }
}
