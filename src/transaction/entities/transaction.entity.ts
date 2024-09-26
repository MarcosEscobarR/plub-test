import { Auditable } from 'src/commons/entities/auditable.entity';
import { TransactionStatus } from 'src/commons/enums/transaction-status';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ManyToOne(() => User, (user) => user.Transactions)
  User: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
