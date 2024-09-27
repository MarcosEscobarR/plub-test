import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { UserId } from './decorators/user.decorator';
import { Authorize } from './decorators/authorize.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return (await this.authService.loginUser(data)).toHttpResponse();
  }

  @Authorize()
  @ApiBearerAuth()
  @Get('me')
  async me(@UserId() userId: string) {
    return (await this.authService.getMe(userId)).toHttpResponse();
  }
}
