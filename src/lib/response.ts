import { IResponse } from 'src/common/interfaces/response';

const SUCCESS_CODE = 0;

export enum CodeError {
  AuthLoginUsernameOrPasswordMismatch = 100,
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
  statusCode = SUCCESS_CODE,
  message = 'Success',
): IResponse<T> {
  return {
    data,
    statusCode,
    message,
  };
}

export function Error(statusCode: any, message?: string): IResponse {
  if (statusCode.code === CodeError.MongoError) {
    return {
      statusCode: statusCode.code,
      message: statusCode.message,
    };
  }
  console.log('statusCode', statusCode);
  console.log('message : ', message || MessageError[statusCode]);

  return {
    statusCode,
    message: message || MessageError[statusCode],
  };
}
