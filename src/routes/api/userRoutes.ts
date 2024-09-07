import { IRouter, Router } from 'express';
import { UserController } from '../../controllers/userController';

const router: IRouter = Router();

const userController = new UserController();

router.get('/', userController.getAllUsers.bind(userController));

export default router;
