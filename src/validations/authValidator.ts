import { BaseValidator } from './baseValidator';
import { LoginDto } from './dto/authDto';

export class AuthValidator {
  static Login = new BaseValidator(LoginDto);
}
