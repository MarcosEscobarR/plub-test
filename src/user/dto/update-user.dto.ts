import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'test@test.com',
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  name?: string;
}
