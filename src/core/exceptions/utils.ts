import { HttpException } from "./http.exception";

export function isHttpException(error: unknown): error is HttpException {
  return error instanceof HttpException;
}

export function getHttpStatus(error: unknown): number {
  if (isHttpException(error)) {
    return error.statusCode;
  }
  return 500;
}

export function createExceptionWithData(
  ExceptionClass: new (message?: string) => HttpException,
  message: string,
  data?: any
) {
  const exception = new ExceptionClass(message);
  (exception as any).data = data;
  return exception;
}
