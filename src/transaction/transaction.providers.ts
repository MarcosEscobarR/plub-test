import {
  DATA_SOURCE,
  TRANSACTION_REPOSITORY,
  TRANSACTION_SUBSCRIBER,
  USER_REPOSITORY,
} from 'src/config/constants';
import { Transaction } from './entities/transaction.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TransactionSubscriber } from './subscribers/transaction.subscriber';

export const TransactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
  {
    provide: TRANSACTION_SUBSCRIBER,
    useFactory: (dataSource: DataSource) =>
      dataSource.subscribers.push(new TransactionSubscriber(dataSource)),
    inject: [DATA_SOURCE],
  },
];
