import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'test@test.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'StrongPassword123',
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
}
