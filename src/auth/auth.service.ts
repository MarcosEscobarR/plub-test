import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { USER_REPOSITORY } from 'src/config/constants';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Result } from 'src/commons/result';
import { JwtService } from '@nestjs/jwt';
import { MeResponseDto } from './dtos/me-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async loginUser({
    password,
    email: username,
  }: LoginDto): Promise<Result<void>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: username },
      });

      if (!user) {
        return Result.fail({ message: 'User not found', statusCode: 404 });
      }

      if (!(await this.comparePasswords(password, user.password))) {
        return Result.fail({ message: 'Invalid credentials', statusCode: 401 });
      }

      const payload = { id: user.id, role: user.role, email: user.email };
      const token = this.jwtService.sign({ payload }, { subject: user.id });
      return Result.success({
        data: { token },
        statusCode: 200,
      });
    } catch (error) {
      return Result.fail({ message: 'An error occurred', statusCode: 500 });
    }
  }

  async getMe(userId: string): Promise<Result<MeResponseDto>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return Result.fail({ message: 'User not found', statusCode: 404 });
      }
      const { id, email, role } = user;

      return Result.success({
        data: { id, email, role } as MeResponseDto,
        statusCode: 200,
      });
    } catch (error) {
      return Result.fail({ message: 'An error occurred', statusCode: 500 });
    }
  }
  private async comparePasswords(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }
}
