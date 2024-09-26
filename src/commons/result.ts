import { NotFoundException } from '@nestjs/common';

export class Result<T> {
  data: T;
  message: IMessage;
  statusCode: number;

  constructor(data: T, message: string, statusCode: number, error?: string) {
    this.data = data;
    this.message = this.message ?? { message: message, error: error };
    this.statusCode = statusCode;
  }

  static success<T>({ data, message, statusCode }: IResultOptions) {
    return new Result<T>(data, message, statusCode);
  }

  static fail<T>({ message, error, data, statusCode = 400 }: IResultOptions) {
    return new Result<T>(data, message, statusCode, error);
  }

  toHttpResponse() {
    if (this.statusCode >= 400 && this.statusCode < 500) {
      throw new NotFoundException({
        message: this.message,
        error: this.data,
        statusCode: this.statusCode,
      });
    }

    // if (this.statusCode >= 200 && this.statusCode < 300) {
    //   return {
    //     data: this.data,
    //     message: this.message,
    //     statusCode: this.statusCode,
    //   };
    // }

    return {
      data: this.data,
      message: this.message,
      statusCode: this.statusCode,
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
