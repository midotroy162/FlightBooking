import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { IsPasswordMatching } from '../decorators/matchingPassword';

export class CreatePlaneCompanyDto {
  @Expose()
  @IsString()
  @MinLength(2)
  name!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  code!: string;

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
  phoneNumber!: string;

  @Expose()
  address!: string;
}
