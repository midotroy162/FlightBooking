import { IUser } from './IUser';

export interface IUserModel {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: number, user: IUser): Promise<IUser | null>;
  deleteUser(id: number): Promise<void>;
}
