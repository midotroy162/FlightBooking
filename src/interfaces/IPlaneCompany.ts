export interface IPlaneCompany {
  id: number;
  name: string;
  code: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  passwordChangedAt: Date;
  emailVerificationToken: string;
  emailVerificationTokenExpires: Date;
  phoneVerificationCode: string;
  phoneVerificationCodeExpires: Date;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
  createdAt: Date;
  updatedAt: Date;
}
