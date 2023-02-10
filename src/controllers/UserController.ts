import { Request, Response, NextFunction } from 'express';
import IAuthResponse from '../interfaces/IAuthResponse';
import IUserCredential from '../interfaces/IUserCredential';
import userService from '../services/UserService';
import { Status } from '../constants/Status';

class UserController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }: IUserCredential = req.body;
      const userData: IAuthResponse = await userService.registration(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserCredential = req.body;
      const userData: IAuthResponse = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(Status.OK).json(token);
    } catch (error) {
      next(error);
    }
  }

  public async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData: IAuthResponse = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
