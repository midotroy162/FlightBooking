import { IUser } from './IUser';
export interface IAuthService {
  signup(user: IUser):  Promise<IUser>;//return token
  login(user: IUser):  Promise<IUser>;//return token
}