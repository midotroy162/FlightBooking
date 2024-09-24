import { ResponsePayload, ResponseStatus, ServiceResponse } from '../interfaces/IResponse';

export function createServiceResponse<T>(
  success: boolean,
  statusCode: number,
  message: string,
  data: T,
  AccessToken?: string,
  RefreshToken?: string,
): ServiceResponse<T> {
  return { success, statusCode, message, data, AccessToken, RefreshToken };
}

export function createApiResponse<T>(
  status: ResponseStatus,
  statusCode: number,
  message: string,
  data: T | null = null,
): ResponsePayload<T> {
  return { status, statusCode, message, data };
}
