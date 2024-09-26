import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return (
      await this.transactionService.create(createTransactionDto)
    ).toHttpResponse();
  }

  @Get()
  async findAll() {
    return (await this.transactionService.findAll()).toHttpResponse();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return (await this.transactionService.findOne(id)).toHttpResponse();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return (
      await this.transactionService.update(id, updateTransactionDto)
    ).toHttpResponse();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (await this.transactionService.remove(id)).toHttpResponse();
  }
}
