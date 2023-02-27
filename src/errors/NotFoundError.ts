import APIError from './APIError';
import { Errors } from '../types/Errors';
import { Status } from '../constants/Status';

class NotFoundError extends APIError {
  constructor(message: string, errors?: Errors) {
    super(Status.NOT_FOUND, message, errors);
  }
}

export default NotFoundError;
