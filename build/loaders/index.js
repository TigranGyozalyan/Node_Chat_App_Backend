"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseLoader_1 = __importDefault(require("./mongooseLoader"));
const expressLoader_1 = __importDefault(require("./expressLoader"));
const socketioLoader_1 = __importDefault(require("./socketioLoader"));
exports.default = async ({ app }) => {
    await mongooseLoader_1.default();
    const server = await expressLoader_1.default({ app });
    await socketioLoader_1.default(server);
    return server;
};
