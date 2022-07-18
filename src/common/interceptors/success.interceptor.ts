import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseSuccess } from '../interfaces/response';

const SUCCESS_CODE = 0;

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponseSuccess<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseSuccess<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          statusCode: SUCCESS_CODE,
          message: data.message ?? 'Success',
        };
      }),
    );
  }
}
