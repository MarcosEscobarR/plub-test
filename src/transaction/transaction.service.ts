import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Result } from 'src/commons/result';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { TRANSACTION_REPOSITORY, USER_REPOSITORY } from 'src/config/constants';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: Repository<Transaction>,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}
  async create({
    userId,
  }: CreateTransactionDto): Promise<Result<TransactionResponseDto>> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return Result.fail({
          message: 'User not found',
          statusCode: 404,
        });
      }

      const transaction = await this.transactionRepository.save({
        User: user,
      });

      return Result.success({ data: this.toResponseObject(transaction) });
    } catch (error) {
      return Result.fail({
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  }

  async findAll(): Promise<Result<TransactionResponseDto[]>> {
    try {
      const transactions = await this.transactionRepository.find({
        relations: ['User'],
        select: {
          User: {
            id: true,
          },
        },
      });
      return Result.success({ data: this.toResponseObject(transactions) });
    } catch (error) {
      return Result.fail({
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    try {
      const transaction = await this.getTransaction(id);

      if (!transaction) {
        return Result.fail({
          message: 'Transaction not found',
          statusCode: 404,
        });
      }

      return Result.success({ data: this.toResponseObject(transaction) });
    } catch (error) {
      return Result.fail({
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Result<TransactionResponseDto>> {
    try {
      const transaction = await this.getTransaction(id);

      if (!transaction) {
        return Result.fail({
          message: 'Transaction not found',
          statusCode: 404,
        });
      }

      await this.transactionRepository.update(id, updateTransactionDto);

      return Result.success({ message: 'Transaction updated successfully' });
    } catch (error) {
      return Result.fail({
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  }

  async remove(id: string): Promise<Result<TransactionResponseDto>> {
    try {
      const transaction = await this.getTransaction(id);

      if (!transaction) {
        return Result.fail({
          message: 'Transaction not found',
          statusCode: 404,
        });
      }
      await this.transactionRepository.softRemove(transaction);
      return Result.success({ message: 'Transaction deleted successfully' });
    } catch (error) {
      return Result.fail({
        message: 'An error occurred',
        statusCode: 500,
      });
    }
  }

  private getTransaction(id: string) {
    return this.transactionRepository.findOne({
      where: { id },
      relations: ['User'],
      select: {
        User: {
          id: true,
        },
      },
    });
  }

  private toResponseObject(
    transaction: Transaction | Transaction[],
  ): TransactionResponseDto | TransactionResponseDto[] {
    if (Array.isArray(transaction)) {
      return transaction.map((t) => this.mapToResponseObject(t));
    }

    return this.mapToResponseObject(transaction);
  }

  private mapToResponseObject(
    transaction: Transaction,
  ): TransactionResponseDto {
    return {
      id: transaction.id,
      status: transaction.status,
      userId: transaction.User.id,
    };
  }
}
