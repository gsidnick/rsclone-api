import { Request, Response, NextFunction, CookieOptions } from 'express';
import IAuthResponse from '../interfaces/IAuthResponse';
import IUserCredential from '../interfaces/IUserCredential';
import userService from '../services/UserService';
import { Status } from '../constants/Status';

const REFRESH_TOKEN_NAME = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 10 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN_OPTIONS: CookieOptions = {
  maxAge: REFRESH_TOKEN_MAX_AGE,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

class UserController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }: IUserCredential = req.body;
      const userData: IAuthResponse = await userService.signup(name, email, password);
      res.cookie(REFRESH_TOKEN_NAME, userData.refreshToken, REFRESH_TOKEN_OPTIONS);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserCredential = req.body;
      const userData: IAuthResponse = await userService.login(email, password);
      res.cookie(REFRESH_TOKEN_NAME, userData.refreshToken, REFRESH_TOKEN_OPTIONS);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie(REFRESH_TOKEN_NAME);
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
      res.cookie(REFRESH_TOKEN_NAME, userData.refreshToken, REFRESH_TOKEN_OPTIONS);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
