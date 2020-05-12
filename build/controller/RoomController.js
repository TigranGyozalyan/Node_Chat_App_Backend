"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const security_1 = require("../security");
const RoomService_1 = __importDefault(require("../service/RoomService"));
const roomRouter = express_1.default.Router();
const roomService = typedi_1.Container.get(RoomService_1.default);
roomRouter.post('/room', security_1.authMiddleware, async (req, res) => {
    const dto = req.body;
    try {
        const createdRoom = await roomService.createRoom(dto, req.user);
        res
            .status(200)
            .send(createdRoom);
    }
    catch (e) {
        res
            .status(e.statusCode)
            .send(e.message);
    }
});
roomRouter.put('/room', security_1.authMiddleware, async (req, res) => {
    const dto = req.body;
    try {
        const updatedRoom = await roomService.updateRoom(dto);
        res
            .status(200)
            .send(updatedRoom);
    }
    catch (e) {
        res
            .status(e.statusCode)
            .send(e.message);
    }
});
exports.default = roomRouter;
