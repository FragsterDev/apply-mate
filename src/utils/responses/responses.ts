export interface SuccessResponse<T = any> {
    success: true;
    statusCode: number;
    message: string;
    timestamp: string;
    page?: number;
    limit?: number;
    data: T
}

export interface ErrorResponse {
    success: false;
    statusCode: number;
    timestamp: string;
    message: string;
}

export function success<T> (
    message: string,
    data: T,
    statusCode: number,
    page: number = 1,
    limit: number = 1,
) : SuccessResponse<T> {
    
    const response: SuccessResponse<T> = {
        success: true,
        statusCode,
        page,
        limit,
        message,
        timestamp: new Date().toISOString(),
        data
    }

    return response;
}

export function error (statusCode: number, message: string) : ErrorResponse {
    const error: ErrorResponse = {
        success: false,
        statusCode,
        timestamp: new Date().toISOString(),
        message
    }

    return error;
}