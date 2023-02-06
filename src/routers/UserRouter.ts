import express from 'express';
import userController from '../controllers/UserController';

const UserRouter = express.Router();

UserRouter.post('/api/registration', userController.registration);
UserRouter.post('/api/login', userController.login);
UserRouter.post('/api/logout', userController.logout);
UserRouter.get('/api/activate/:link', userController.activate);
UserRouter.get('/api/refresh', userController.refresh);

export default UserRouter;
