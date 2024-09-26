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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return (await this.usersService.create(createUserDto)).toHttpResponse();
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).toHttpResponse();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return (await this.usersService.findOne(id)).toHttpResponse();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return (await this.usersService.update(id, updateUserDto)).toHttpResponse();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (await this.usersService.remove(id)).toHttpResponse();
  }
}
