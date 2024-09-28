import { BaseValidator } from './baseValidator';
import { CreatePlaneCompanyDto } from './dto/planeCompanyDto';

export class PlaneCompanyValidator {
  static create = new BaseValidator(CreatePlaneCompanyDto);
}
