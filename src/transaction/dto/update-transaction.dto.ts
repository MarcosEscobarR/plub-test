import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { TransactionStatus } from 'src/commons/enums/transaction-status';
import { IsEnum } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
