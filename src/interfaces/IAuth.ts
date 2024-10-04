import { IPlaneCompany } from './IPlaneCompany';
import { ServiceResponse } from './IResponse';
import { IUser } from './IUser';
export interface IAuthService {
  signup(user: IUser): Promise<ServiceResponse<IUser>>;
  login(user: IUser): Promise<ServiceResponse<IUser>>;
}

export interface IPlaneCompanyService {
  signup(planeCompany: IPlaneCompany): Promise<ServiceResponse<IPlaneCompany>>;
  login(planeCompany: IPlaneCompany): Promise<ServiceResponse<IPlaneCompany>>;
}
