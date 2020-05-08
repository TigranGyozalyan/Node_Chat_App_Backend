"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const UserService_1 = __importDefault(require("../service/UserService"));
const userRouter = express_1.default.Router();
const userService = typedi_1.Container.get(UserService_1.default);
userRouter.post('/user', async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(200).send();
    }
    catch (e) {
        res.status(400)
            .send(e.message);
    }
});
exports.default = userRouter;
