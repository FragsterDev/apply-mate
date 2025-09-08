export interface SuccessResponse<T = any> {
  success: true;
  statusCode: number;
  message: string;
  timestamp: string;
  page?: number;
  limit?: number;
  total?: number | undefined;
  data: T;
}

export interface ErrorResponse {
  success: false;
  statusCode: number;
  timestamp: string;
  message: string;
  errors?: unknown;
}

export function success<T>(
  message: string,
  data: T,
  statusCode: number,
  page: number = 1,
  limit: number = 1,
  total?: number
): SuccessResponse<T> {
  const response: SuccessResponse<T> = {
    success: true,
    statusCode,
    page,
    limit,
    message,
    timestamp: new Date().toISOString(),
    total,
    data,
  };

  return response;
}

export function error(
  statusCode: number,
  message: string,
  errors?: unknown
): ErrorResponse {
  const error: ErrorResponse = {
    success: false,
    statusCode,
    timestamp: new Date().toISOString(),
    message,
    errors,
  };

  return error;
}
