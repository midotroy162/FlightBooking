import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IAuthService } from '../interfaces/IAuthService';
import { UserModel } from '../models/userModel';
import { ServiceResponse } from '../interfaces/IResponse';
import { createServiceResponse } from './../helper/response';
import createToken from '../helper/createToken';

export class AuthService implements IAuthService {
  private userModel: IUserModel;
  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }

  async signup(user: IUser): Promise<ServiceResponse<IUser>> {
    let data = await this.userModel.createUser(user);
    if (!data) {
      return createServiceResponse(false, 400, 'User creation failed', data);
    }
    const token = createToken(data.id);
    return createServiceResponse(true, 200, 'User created successfully', data, token);
  }
}
