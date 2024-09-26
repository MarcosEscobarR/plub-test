import { Auditable } from 'src/commons/entities/auditable.entity';
import { Role } from '../../commons/enums/roles';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Entity()
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  @Index({ unique: true })
  email: string;

  @Column({
    length: 50,
    default: '',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Transaction, (transaction) => transaction.User)
  Transactions: Transaction[];

  @DeleteDateColumn()
  deletedAt: Date;
}
