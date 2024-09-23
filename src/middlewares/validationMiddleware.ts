import { Request, Response, NextFunction } from 'express';
import { BaseValidator, ValidationException } from '../validations/baseValidator';
import { createApiResponse } from '../helper/response';

export function validate<T extends object>(validator: BaseValidator<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await validator.validate(req.body);
      next();
    } catch (error) {
      if (error instanceof ValidationException) {
        res.status(422).json(createApiResponse('error', 422, error.errors?.pop() as string, null));
        return;
      }
      next(error);
    }
  };
}
