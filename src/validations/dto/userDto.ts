import { IsString, IsEmail, MinLength, IsStrongPassword,IsMobilePhone } from 'class-validator';
import { Expose } from 'class-transformer';
import {IsPasswordMatching } from '../decorators/matchingPassword';

export class CreateUserDto {
  @Expose()
  @IsString()
  @MinLength(2)
  firstName!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  lastName!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @IsStrongPassword()
  password!: string;
  @Expose()
  @IsPasswordMatching('password')
  confirmPassword!: string;

  @Expose()
  @IsMobilePhone('ar-EG',{ strictMode: true },
  {
    message: 'Phone number must be valid for Egypt',
  })
  phoneNumber!: string;

  @Expose()
  username!: string;
}
