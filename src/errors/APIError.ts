import { Errors } from '../types/Errors';
import { ErrorCode } from '../types/ErrorCode';

abstract class APIError extends Error {
  public status: ErrorCode;
  public errors: Errors;

  protected constructor(status: ErrorCode, message: string, errors: Errors = []) {
    super(message);
    Object.setPrototypeOf(this, APIError.prototype);
    this.status = status;
    this.errors = errors;
  }
}

export default APIError;
