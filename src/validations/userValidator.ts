import { BaseValidator } from './baseValidator';
import { CreateUserDto } from './dto/userDto';

export class UserValidator {
  static create = new BaseValidator(CreateUserDto);
}
