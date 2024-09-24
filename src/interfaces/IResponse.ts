export interface ServiceResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  AccessToken?: string;
  RefreshToken?: string;
}

export type ResponseStatus = 'success' | 'error';

export interface ResponsePayload<T> {
  status: ResponseStatus;
  statusCode: number;
  message: string;
  data: T | null;
}
