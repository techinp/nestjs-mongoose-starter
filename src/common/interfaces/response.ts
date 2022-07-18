import { CodeError } from 'src/lib/response';

export interface IMongoError {
  code: CodeError;
  message: string;
}

export interface IResponse<T = void> {
  statusCode: number | IMongoError;
  message: string;
  data?: T;
}
