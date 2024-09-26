import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Auditable {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
