import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/commons/enums/roles';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    required: true,
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    example: `${Role.User} | ${Role.Admin}`,
  })
  @IsEnum(Role)
  role: Role;
}
