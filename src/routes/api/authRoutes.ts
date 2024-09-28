import { IRouter, Router } from 'express';
import { AuthController, PlaneCompanyAuthController } from '../../controllers/authController';
import { validate } from '../../middlewares/validationMiddleware';
import { UserValidator } from '../../validations/userValidator';
import { AuthValidator } from '../../validations/authValidator';
import { PlaneCompanyValidator } from '../../validations/planeCompanyValidator';

const router: IRouter = Router();

const authController = new AuthController();
const planeCompanyAuthController = new PlaneCompanyAuthController();

router
  .post('/users/signup', validate(UserValidator.create), authController.signup.bind(authController))
  .post('/users/login', validate(AuthValidator.Login), authController.login.bind(authController));

router
  .post(
    '/planes/companies/signup',
    validate(PlaneCompanyValidator.create),
    planeCompanyAuthController.signup.bind(planeCompanyAuthController),
  )
  .post(
    '/planes/companies/login',
    validate(AuthValidator.Login),
    planeCompanyAuthController.login.bind(planeCompanyAuthController),
  );

export default router;
