import { USER_REPOSITORY, DATA_SOURCE } from 'src/config/constants';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const authProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
