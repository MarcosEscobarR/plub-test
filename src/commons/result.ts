import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class Result<T> {
  data: T;
  message: IMessage;
  statusCode: number;

  constructor(data: T, message: string, statusCode: number, error?: string) {
    this.data = data;
    this.message =
      message || error ? { message: message, error: error } : undefined;
    this.statusCode = statusCode;
  }

  static success<T>({ data, message, statusCode }: IResultOptions) {
    return new Result<T>(data, message, statusCode);
  }

  static fail<T>({ message, error, data, statusCode = 400 }: IResultOptions) {
    return new Result<T>(data, message, statusCode, error);
  }

  toHttpResponse() {
    if (this.statusCode === 400) {
      throw new BadRequestException({
        message: this.message,
        error: this.data,
      });
    }

    if (this.statusCode === 404) {
      throw new NotFoundException({
        message: this.message,
      });
    }

    if (this.statusCode === 500) {
      throw new InternalServerErrorException(this.message.message);
    }

    // manejar otros status codes

    return {
      data: this.data,
      message: this.message,
    };
  }
}

export interface IMessage {
  message: string;
  error?: string;
}

interface IResultOptions {
  message?: string;
  error?: string;
  data?: any;
  statusCode?: number;
}
