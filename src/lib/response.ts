import {
  IResponseSuccess,
  IResponseErrors,
  IMongoError,
} from 'src/common/interfaces/response';

export enum CodeError {
  AuthLoginError = 100,
  SomethingsError = 999,
  // No need message
  MongoError = 11000,
}

const MessageError = {
  100: 'ชื่อผู้ใช้หรือรหัสผ่่านไม่ถูกต้อง',
  999: 'มีบางอย่างผิดพลาด โปรดลองอีกครั้ง',
};

export function Success<T>(
  data: T,
  statusCode = 0,
  message = 'Success',
): IResponseSuccess<T> {
  return {
    data,
    statusCode,
    message,
  };
}

export function Error(statusCode: any, message?: string): IResponseErrors {
  if (statusCode.code === CodeError.MongoError) {
    return {
      statusCode: statusCode.code,
      message: statusCode.message,
    };
  }

  return {
    statusCode,
    message: message || MessageError[statusCode],
  };
}
