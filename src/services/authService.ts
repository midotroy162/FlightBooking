import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IAuthService } from '../interfaces/IAuthService';
import { UserModel } from '../models/userModel';
import { ServiceResponse } from '../interfaces/IResponse';
import { createServiceResponse } from '../helper/response';
import createToken from '../helper/createToken';
// import { compareSync } from 'bcrypt';

export class AuthService implements IAuthService {
  private userModel: IUserModel;
  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }
  async signup(data: IUser): Promise<ServiceResponse<IUser>> {
    let user = await this.userModel.createUser(data);
    if (!user) {
      return createServiceResponse(false, 400, 'User creation failed', {} as IUser);
    }
    const token = createToken(user.id);
    return createServiceResponse(true, 200, 'User created successfully', user, token);
  }
  async login(data: IUser): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.getUserByEmail(data.email);
    if (!user || !(data.password === user.password))
      return createServiceResponse(false, 404, 'Invalid login credentials', {} as IUser);
    const token = createToken(user.id);
    return createServiceResponse(true, 200, 'User logged in successfully', user, token);
  }
}
