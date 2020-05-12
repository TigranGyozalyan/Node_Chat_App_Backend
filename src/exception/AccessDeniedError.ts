import ErrorWithStatusCode from './ErrorWithStatusCode';

export default class AccessDeniedError extends ErrorWithStatusCode {
  constructor(message: string) {
    super(message, 403);
  }
}
