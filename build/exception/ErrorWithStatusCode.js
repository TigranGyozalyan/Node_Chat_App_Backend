"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorWithStatusCode extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ErrorWithStatusCode;
