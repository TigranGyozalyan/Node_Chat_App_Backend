"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const SocketController_1 = __importDefault(require("../controller/SocketController"));
exports.default = (server) => {
    const io = socket_io_1.default(server);
    SocketController_1.default(io);
};
