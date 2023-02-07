import { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';
import { Status } from '../constants/Status';

function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof APIError) {
    return res.status(err.status).json({ status: err.status, message: err.message, errors: err.errors });
  }
  return res
    .status(Status.INTERNAL_SERVER_ERROR)
    .json({ status: Status.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
}

export default ErrorHandler;
