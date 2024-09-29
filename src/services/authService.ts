import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IAuthService, IPlaneCompanyService } from '../interfaces/IAuthService';
import { UserModel } from '../models/userModel';
import { ServiceResponse } from '../interfaces/IResponse';
import { createServiceResponse } from '../helper/response';
import createToken from '../helper/createToken';
import { IPlaneCompanyModel } from '../interfaces/IPlaneCompanyModel';
import { IPlaneCompany } from '../interfaces/IPlaneCompany';
import { PlaneCompanyModel } from '../models/planeCompanyModel';
import  bcrypt  from 'bcrypt';

export class AuthService implements IAuthService {
  private userModel: IUserModel;
  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }
  async signup(data: IUser): Promise<ServiceResponse<IUser>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    let user = await this.userModel.createUser(data);
    if (!user) {
      return createServiceResponse(false, 400, 'User creation failed', {} as IUser);
    }
    const token = createToken(user.id);
    return createServiceResponse(true, 200, 'User created successfully', user, token);
  }
  async login(data: IUser): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.getUserByEmail(data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      return createServiceResponse(false, 404, 'Invalid login credentials', {} as IUser);
    const token = createToken(user.id);
    return createServiceResponse(true, 200, 'User logged in successfully', user, token);
  }
}

export class AuthPlaneCompanyService implements IPlaneCompanyService {
  private planeCompanyModel: IPlaneCompanyModel;
  constructor(planeCompanyModel: IPlaneCompanyModel = new PlaneCompanyModel()) {
    this.planeCompanyModel = planeCompanyModel;
  }
  async signup(data: IPlaneCompany): Promise<ServiceResponse<IPlaneCompany>> {
    let planeCompany = await this.planeCompanyModel.createPlaneCompany(data);
    if (!planeCompany) {
      return createServiceResponse(
        false,
        400,
        'Plane Company creation failed',
        {} as IPlaneCompany,
      );
    }
    console.log('planeCompany: ', planeCompany);
    const token = createToken(planeCompany.id);
    return createServiceResponse(
      true,
      200,
      'Plane Company created successfully',
      planeCompany,
      token,
    );
  }
  async login(data: IPlaneCompany): Promise<ServiceResponse<IPlaneCompany>> {
    const planeCompany = await this.planeCompanyModel.getPlaneCompanyByEmail(data.email);
    if (!planeCompany || !(data.password === planeCompany.password))
      return createServiceResponse(false, 404, 'Invalid login credentials', {} as IPlaneCompany);
    const token = createToken(planeCompany.id);
    return createServiceResponse(
      true,
      200,
      'Plane Company logged in successfully',
      planeCompany,
      token,
    );
  }
}
