import { Request, Response, NextFunction } from 'express';
import IUserData from '../interfaces/IUserData';
import IUserCredential from '../interfaces/IUserCredential';
import userService from '../services/UserService';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserCredential = req.body;
      const userData: IUserData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserCredential = req.body;
      const userData: IUserData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
