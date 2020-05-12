import ErrorWithStatusCode from './ErrorWithStatusCode';

export default class UserNotFoundError extends ErrorWithStatusCode {
  constructor(message: string) {
    super(message, 400);
  }
}
