export type ErrorFields = Record<string, string>;

export enum ErrorCode {
  VALIDATION_ERROR = 400,
  UNAUTHORIZED = 401,
  INVALID_CREDENTIALS = 401,
  SESSION_EXPIRED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  EMAIL_ALREADY_EXIST = 409,
  SHIFT_ALREADY_OPEN = 409,
  SHIFT_CLOSED = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export type ErrorCodeKeys = keyof typeof ErrorCode;

export type SuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  error: {
    status: ErrorCode;
    code: ErrorCodeKeys;
    fields?: ErrorFields;
  };
};

export type ServerActionResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;
