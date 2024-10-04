import { IPlaneCompany, IPlaneCompanyResponse } from '../interfaces/IPlaneCompany';

export class PlaneCompanyResponse {
  private planeCompany = {} as IPlaneCompany;
  constructor(planeCompany: IPlaneCompany | null) {
    this.planeCompany = planeCompany ?? ({} as IPlaneCompany);
  }

  public getPlaneCompany(): IPlaneCompanyResponse {
    if (!this.planeCompany) {
      return {} as IPlaneCompanyResponse;
    }
    return {
      id: this.planeCompany.id,
      name: this.planeCompany.name,
      code: this.planeCompany.code,
      email: this.planeCompany.email,
      phoneNumber: this.planeCompany.phoneNumber,
      address: this.planeCompany.address,
      isEmailVerified: this.planeCompany.isEmailVerified,
      isPhoneVerified: this.planeCompany.isPhoneVerified,
      createdAt: this.planeCompany.createdAt,
      updatedAt: this.planeCompany.updatedAt,
    };
  }
}
