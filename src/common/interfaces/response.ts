import { CodeError } from 'src/lib/response';

export interface IMongoError {
  code: CodeError;
  message: string;
}

export interface IResponseErrors {
  statusCode: number | IMongoError;
  message: string;
}

export interface IResponseSuccess<T> extends IResponseErrors {
  data: T;
}
