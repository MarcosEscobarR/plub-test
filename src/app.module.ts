import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UsersModule, DatabaseModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
