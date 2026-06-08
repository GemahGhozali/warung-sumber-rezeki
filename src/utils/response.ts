import { SuccessResponse, ErrorResponse, ErrorFields, ErrorCodeKeys, ErrorCode } from "@/types";

type SendSuccessResponseParams<T> = {
  message: string;
  data: T;
};

type SendErrorResponseParams = {
  message: string;
  code: ErrorCodeKeys;
  fields?: ErrorFields;
};

export function sendSuccessResponse<T = unknown>({ message, data }: SendSuccessResponseParams<T>): SuccessResponse<T> {
  return { success: true, message, data };
}

export function sendErrorResponse({ message, code, fields }: SendErrorResponseParams): ErrorResponse {
  return {
    success: false,
    message,
    error: {
      status: ErrorCode[code],
      code,
      ...(fields && { fields }),
    },
  };
}
