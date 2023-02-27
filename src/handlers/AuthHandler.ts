import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import tokenService from '../services/TokenService';

async function AuthHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    if (authorization === undefined) throw new UnauthorizedError('User is not logged in');

    const accessToken = authorization.split(' ')[1];
    if (accessToken === undefined) throw new UnauthorizedError('User is not logged in');

    let userData = tokenService.verifyAccessToken(accessToken);
    if (userData === null) throw new UnauthorizedError('User is not logged in');

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
}

export default AuthHandler;
