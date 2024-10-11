import { IBaseModel } from '.';
import { users } from '../schema';
import { ServiceResponse } from './IResponse';

export type IUser = typeof users.$inferSelect;

export interface IUserModel extends IBaseModel<typeof users> {
  getUserByEmail(email: string): Promise<IUser | null>;
}

export interface IUserService {
  getAllUsers(): Promise<ServiceResponse<IUser[]>>;
  getUserById(id: number): Promise<ServiceResponse<IUser | null>>;
  createUser(user: IUser): Promise<ServiceResponse<IUser | null>>;
  updateUser(id: number, user: IUser): Promise<ServiceResponse<IUser | null>>;
  deleteUser(id: number): Promise<void>;
}

export interface IUserResponse extends Omit<IUser, 'password'> {}
