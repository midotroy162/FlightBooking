import { ResponsePayload, ResponseStatus, ServiceResponse } from '../interfaces/IResponse';

export function createServiceResponse<T>(
  success: boolean,
  statusCode: number,
  message: string,
  data: T,
  accessToken?: string,
  refreshToken?: string,
): ServiceResponse<T> {
  return { success, statusCode, message, data, accessToken, refreshToken };
}

export function createApiResponse<T>(
  success: boolean,
  statusCode: number,
  message: string,
  data: T | null = null,
  accessToken?: string
): ResponsePayload<T> {
  let status: ResponseStatus = success ? 'success' : 'error';
  return { status, statusCode, message, data,accessToken };
}
