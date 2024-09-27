import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
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
    example: 'password',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    example: `${Role.User} | ${Role.Admin}`,
  })
  @IsEnum(Role)
  role: Role;
}
