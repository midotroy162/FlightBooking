import { IPlaneCompany } from './IPlaneCompany';

export interface IPlaneCompanyModel {
  createPlaneCompany(planeCompany: IPlaneCompany): Promise<IPlaneCompany>;
  getPlaneCompanyByEmail(email: string): Promise<IPlaneCompany | null>;
}
