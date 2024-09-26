import {
  DATA_SOURCE,
  TRANSACTION_REPOSITORY,
  USER_REPOSITORY,
} from 'src/config/constants';
import { Transaction } from './entities/transaction.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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
];
