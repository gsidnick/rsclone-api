import APIError from './APIError';
import { Errors } from '../types/Errors';
import { Status } from '../constants/Status';

class ConflictError extends APIError {
  constructor(message: string, errors?: Errors) {
    super(Status.CONFLICT, message, errors);
  }
}

export default ConflictError;
