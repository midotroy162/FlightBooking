import Router, { IRouter } from 'express';
import userRoutes from './api/userRoutes';
import authRoutes from './api/authRoutes';
const routes: IRouter = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
