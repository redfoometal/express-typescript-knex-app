import { HttpException } from "./http.exception";
import { createHttpException } from "./factory";

const BadRequestException = createHttpException(
  "BadRequestException",
  400,
  "Bad request"
);

const UnauthorizedException = createHttpException(
  "UnauthorizedException",
  401,
  "Unauthorized"
);

const ForbiddenException = createHttpException(
  "ForbiddenException",
  403,
  "Forbidden"
);

const NotFoundException = createHttpException(
  "NotFoundException",
  404,
  "Not Found"
);

const ConflictException = createHttpException(
  "ConflictException",
  409,
  "Conflict"
);

const UnprocessableEntityException = createHttpException(
  "UnprocessableEntityException",
  422,
  "Unprocessable Entity"
);

const TooManyRequestsException = createHttpException(
  "TooManyRequestsException",
  429,
  "Too Many Requests"
);

const InternalServerErrorException = createHttpException(
  "InternalServerErrorException",
  500,
  "Internal Server Error"
);

const ServiceUnavailableException = createHttpException(
  "ServiceUnavailableException",
  503,
  "Service Unavailable"
);

export {
  HttpException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
  TooManyRequestsException,
  InternalServerErrorException,
  ServiceUnavailableException,
};
