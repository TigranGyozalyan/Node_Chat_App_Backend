"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const RoomService_1 = __importDefault(require("../service/RoomService"));
const roomService = typedi_1.Container.get(RoomService_1.default);
const instantiate = (io) => {
    io.on('connect', (socket) => {
        console.log('New connection');
        socket.on('join', (data) => {
            console.log(data);
            socket.join(data);
        });
        socket.on('send', async (message) => {
            console.log(message);
            await roomService.addMessageToRoom(message);
            io.to(message.roomId).emit('success');
        });
    });
};
exports.default = instantiate;
