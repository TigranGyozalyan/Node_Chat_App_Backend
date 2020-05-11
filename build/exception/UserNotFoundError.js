"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
exports.UserNotFoundError = UserNotFoundError;
