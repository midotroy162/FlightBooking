interface ICommonIPlaneCompany {
  id: number;
  name: string;
  code: string;
  email: string;
  phoneNumber: string;
  address: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaneCompany extends ICommonIPlaneCompany {
  password: string;
  passwordChangedAt: Date;
  emailVerificationToken: string;
  emailVerificationTokenExpires: Date;
  phoneVerificationCode: string;
  phoneVerificationCodeExpires: Date;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
}

export interface IPlaneCompanyModel {
  createPlaneCompany(planeCompany: IPlaneCompany): Promise<IPlaneCompany>;
  getPlaneCompanyByEmail(email: string): Promise<IPlaneCompany | null>;
}

export interface IPlaneCompanyResponse extends ICommonIPlaneCompany {}
