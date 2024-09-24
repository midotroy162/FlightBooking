import { IsString, IsEmail, MinLength, IsStrongPassword, matches } from 'class-validator';
import { Expose } from 'class-transformer';

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
  username!: string;
}
