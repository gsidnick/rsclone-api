import { ErrorCode } from './ErrorCode';
import { RedirectionCode } from './RedirectionCode';
import { SuccessCode } from './SuccessCode';

export type StatusCode = SuccessCode | RedirectionCode | ErrorCode;
