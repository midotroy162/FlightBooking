import { IUser } from './IUser';
export interface IAuthService {
  signup(user: IUser):  Promise<IUser>;//return token
}