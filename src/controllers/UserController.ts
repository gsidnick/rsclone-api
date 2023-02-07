import { Request, Response } from 'express';
import IUserData from '../interfaces/IUserData';
import IUserCredential from '../interfaces/IUserCredential';
import userService from '../services/UserService';
import { Status } from '../constants/Status';

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password }: IUserCredential = req.body;
      const userData: IUserData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 864000000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(Status.INTERNAL_SERVER_ERROR).send(error.message);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async activate(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
