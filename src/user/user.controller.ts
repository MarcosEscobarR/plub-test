import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { Role } from 'src/commons/enums/roles';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Registra un usuario, ROL: USER, ADMIN' })
  async create(@Body() createUserDto: CreateUserDto) {
    return (await this.usersService.create(createUserDto)).toHttpResponse();
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista todos los usuarios no eliminados, ROL: USER, ADMIN',
  })
  @Authorize([Role.Admin, Role.User])
  async findAll() {
    return (await this.usersService.findAll()).toHttpResponse();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Devuelve un usuario por Id, ROL: USER, ADMIN' })
  @Authorize([Role.Admin, Role.User])
  async findOne(@Param('id') id: string) {
    return (await this.usersService.findOne(id)).toHttpResponse();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualiza un Usuario, ROL: ADMIN' })
  @Authorize([Role.Admin])
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return (await this.usersService.update(id, updateUserDto)).toHttpResponse();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina un usuario, ROL:  ADMIN' })
  @Authorize([Role.Admin])
  async remove(@Param('id') id: string) {
    return (await this.usersService.remove(id)).toHttpResponse();
  }
}
