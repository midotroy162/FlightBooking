import { validate, ValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { IValidator } from '../interfaces/IValidator';

export class ValidationException extends Error {
  constructor(public errors: string[]) {
    super('Validation failed');
    this.name = 'ValidationException';
  }
}

export class BaseValidator<T extends object> implements IValidator<T> {
  constructor(private readonly type: ClassConstructor<T>) {}

  async validate(data: T): Promise<T> {
    const instance = plainToInstance(this.type, data, { excludeExtraneousValues: true });
    const errors = await validate(instance);

    if (errors.length > 0) {
      throw new ValidationException(this.formatErrors(errors));
    }

    return instance;
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error: ValidationError) => {
      if (error.constraints) {
        return Object.values(error.constraints);
      }
      return [];
    });
  }
}
