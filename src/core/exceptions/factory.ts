import { HttpException } from "./http.exception";

type ExceptionConstructor = new (message?: string) => HttpException;

export function createHttpException(
  name: string,
  code: number,
  defaultMessage: string
): ExceptionConstructor {
  return class extends HttpException {
    constructor(message: string = defaultMessage) {
      super(message, code);
      this.name = name;
    }
  };
}
