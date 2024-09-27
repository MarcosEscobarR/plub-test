import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'src/config/constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Result } from 'src/commons/result';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Result<UserResponseDto>> {
    try {
      const password: string = this.hashPassword(createUserDto.password);
      const user = await this.userRepository.save({
        ...createUserDto,
        password,
      });
      const data = this.toResponseObject(user);

      return Result.success({ data });
    } catch (error) {
      return Result.fail({
        message: 'Error creating user',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  async findAll(): Promise<Result<UserResponseDto[]>> {
    try {
      const users = await this.userRepository.find();

      return Result.success({ data: this.toResponseObject(users) });
    } catch (error) {
      return Result.fail({
        message: 'Error getting users',
        error: error.message,
        statusCode: 500,
      });
    }
  }

  async findOne(id: string): Promise<Result<UserResponseDto>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        return Result.fail({
          message: 'User not found',
          statusCode: 404,
        });
      }

      return Result.success({ data: this.toResponseObject(user) });
    } catch (error) {}
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return Result.fail({
          message: 'User not found',
          statusCode: 404,
        });
      }

      await this.userRepository.update(id, updateUserDto);
      return Result.success({ message: 'User updated successfully' });
    } catch (error) {
      return Result.fail({ message: 'Error updating user', statusCode: 500 });
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return Result.fail({
          message: 'User not found',
          statusCode: 404,
        });
      }

      this.userRepository.softRemove(user);

      return Result.success({ message: 'User deleted successfully' });
    } catch (error) {
      return Result.fail({ message: 'Error deleting user', statusCode: 500 });
    }
  }

  private toResponseObject(
    user: User | User[],
  ): UserResponseDto | UserResponseDto[] {
    if (Array.isArray(user)) {
      return user.map((u) => this.mapResponseObject(u));
    }
    return this.mapResponseObject(user);
  }

  private mapResponseObject(user: User): UserResponseDto {
    const { id, name, email, role, createdAt, updatedAt } = user;
    return { id, name, email, role, createdAt, updatedAt };
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
