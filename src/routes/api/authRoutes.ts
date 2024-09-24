import { IRouter, Router } from 'express';
import { AuthController } from '../../controllers/authController';

const router: IRouter = Router();

const  authController= new AuthController();

router.post('/signup', authController.signup.bind(authController))
    .post('/login',authController.login.bind(authController));

export default router;