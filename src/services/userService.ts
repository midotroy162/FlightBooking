import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IUserService } from '../interfaces/IUserService';
import { UserModel } from '../models/userModel';

export class UserService implements IUserService {
  private userModel: IUserModel;
  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userModel.getAllUsers();
  }

  async getUserById(id: number): Promise<IUser | null> {
    return this.userModel.getUserById(id);
  }

  async createUser(user: IUser): Promise<IUser> {
    return this.userModel.createUser(user);
  }

  async updateUser(id: number, user: IUser): Promise<IUser | null> {
    return this.userModel.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userModel.deleteUser(id);
  }
}
