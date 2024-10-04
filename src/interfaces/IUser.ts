import { ServiceResponse } from './IResponse';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: number, user: IUser): Promise<IUser | null>;
  deleteUser(id: number): Promise<void>;
  getUserByEmail(email: string): Promise<IUser | null>;
}

export interface IUserService {
  getAllUsers(): Promise<ServiceResponse<IUser[]>>;
  getUserById(id: number): Promise<ServiceResponse<IUser | null>>;
  createUser(user: IUser): Promise<ServiceResponse<IUser>>;
  updateUser(id: number, user: IUser): Promise<ServiceResponse<IUser | null>>;
  deleteUser(id: number): Promise<void>;
}

export interface IUserResponse extends Omit<IUser, 'password'> {}
