import { IRouter, Router } from 'express';
import { AuthController } from '../../controllers/authController';
import { validate } from '../../middlewares/validationMiddleware';
import { UserValidator } from '../../validations/userValidator';

const router: IRouter = Router();

const authController = new AuthController();

router.post('/signup', validate(UserValidator.create), authController.signup.bind(authController));

export default router;
