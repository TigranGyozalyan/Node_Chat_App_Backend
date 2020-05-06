"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("./mongoose"));
const express_1 = __importDefault(require("./express"));
const socketio_1 = __importDefault(require("./socketio"));
exports.default = async ({ app }) => {
    await mongoose_1.default();
    const server = await express_1.default({ app });
    await socketio_1.default(server);
    return server;
};
