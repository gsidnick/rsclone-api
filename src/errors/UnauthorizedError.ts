import APIError from './APIError';
import { Errors } from '../types/Errors';
import { Status } from '../constants/Status';

class UnauthorizedError extends APIError {
  constructor(message: string, errors?: Errors) {
    super(Status.UNAUTHORIZED, message, errors);
  }
}

export default UnauthorizedError;
