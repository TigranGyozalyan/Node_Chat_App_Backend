"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorWithStatusCode_1 = __importDefault(require("./ErrorWithStatusCode"));
class AccessDeniedError extends ErrorWithStatusCode_1.default {
    constructor(message) {
        super(message, 403);
    }
}
exports.default = AccessDeniedError;
