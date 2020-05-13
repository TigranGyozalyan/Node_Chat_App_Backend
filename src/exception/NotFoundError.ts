import ErrorWithStatusCode from './ErrorWithStatusCode';

export default class NotFoundError extends ErrorWithStatusCode {
  constructor(message: string) {
    super(message, 400);
  }
}
