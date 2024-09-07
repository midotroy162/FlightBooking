import Router, { IRouter } from 'express';
import userRoutes from './api/userRoutes';

const routes: IRouter = Router();

routes.use('/users', userRoutes);

export default routes;
