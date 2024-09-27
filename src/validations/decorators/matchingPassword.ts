import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

// Custom Validator Constraint
@ValidatorConstraint({ async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
      const password = (args.object as any)[relatedPropertyName];
    return confirmPassword === password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Confirm Password do not match!';
  }
}

// Custom Decorator
export function IsPasswordMatching(
  property: string,
  validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsPasswordMatchingConstraint,
    });
  };
}
