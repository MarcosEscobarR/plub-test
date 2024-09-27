import { Module } from '@nestjs/common';

import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, TransactionModule, AuthModule],
})
export class AppModule {}
