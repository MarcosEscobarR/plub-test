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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { Role } from 'src/commons/enums/roles';

@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Authorize([Role.Admin, Role.User])
  @ApiOperation({ summary: 'Crea una nueva transacción, ROL: USER, ADMIN' })
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return (
      await this.transactionService.create(createTransactionDto)
    ).toHttpResponse();
  }

  @Authorize([Role.Admin, Role.User])
  @ApiOperation({ summary: 'Lista todas las transacciones, ROL: USER, ADMIN' })
  @Get()
  async findAll() {
    return (await this.transactionService.findAll()).toHttpResponse();
  }

  @Authorize([Role.Admin, Role.User])
  @ApiOperation({
    summary: 'Devuelve un transacción apartir de un id, ROL: USER, ADMIN',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return (await this.transactionService.findOne(id)).toHttpResponse();
  }

  @Authorize([Role.Admin, Role.User])
  @ApiOperation({
    summary: 'Actualiza el estado de una transacción, ROL: USER, ADMIN',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return (
      await this.transactionService.update(id, updateTransactionDto)
    ).toHttpResponse();
  }

  @Authorize([Role.Admin, Role.User])
  @ApiOperation({ summary: 'Elimina una transacción, ROL: USER, ADMIN' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (await this.transactionService.remove(id)).toHttpResponse();
  }
}
