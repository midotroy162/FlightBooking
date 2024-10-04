import { createServiceResponse } from '../helper/response';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUser';
import { IUserService } from '../interfaces/IUser';
import { UserModel } from '../models/userModel';
import { ServiceResponse } from './../interfaces/IResponse';

export class UserService implements IUserService {
  private userModel: IUserModel;
  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }

  async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    let users = await this.userModel.getAllUsers();
    return createServiceResponse(true, 200, 'Users fetched successfully', users);
  }

  async getUserById(id: number): Promise<ServiceResponse<IUser | null>> {
    let user = await this.userModel.getUserById(id);
    return createServiceResponse(true, 200, 'User fetched successfully', user);
  }

  async createUser(data: IUser): Promise<ServiceResponse<IUser>> {
    let user = await this.userModel.createUser(data);
    return createServiceResponse(true, 200, 'User created successfully', user);
  }

  async updateUser(id: number, data: IUser): Promise<ServiceResponse<IUser | null>> {
    let user = await this.userModel.updateUser(id, data);
    return createServiceResponse(true, 200, 'User updated successfully', user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userModel.deleteUser(id);
  }
}
