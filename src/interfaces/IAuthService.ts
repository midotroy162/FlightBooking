import { ServiceResponse } from './IResponse';
import { IUser } from './IUser';
export interface IAuthService {
  signup(user: IUser): Promise<ServiceResponse<IUser>>;
}
