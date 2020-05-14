"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const UserService_1 = __importDefault(require("../service/UserService"));
const EncryptionUtil_1 = __importDefault(require("../util/EncryptionUtil"));
const JWTService_1 = __importDefault(require("../service/JWTService"));
const userService = typedi_1.Container.get(UserService_1.default);
const jwtService = typedi_1.Container.get(JWTService_1.default);
exports.loginMiddleware = async (req, res) => {
    const principal = req.body;
    principal.password = EncryptionUtil_1.default.encrypt(principal.password);
    try {
        const user = await userService.getUserByCredentials(principal);
        const jwtToken = jwtService.generateToken(user);
        res
            .status(200)
            .header('Authorization', jwtToken)
            .send();
    }
    catch (e) {
        res
            .status(e.statusCode)
            .send(e.message);
    }
};
exports.authMiddleware = async (req, res, next) => {
    let token = req.header('Authorization');
    if (token) {
        token = token.replace('Bearer ', '');
        try {
            req.user = jwtService.validateToken(token);
            next();
        }
        catch (e) {
            res
                .status(403)
                .send(e.message);
        }
    }
    else {
        res
            .status(403)
            .send();
    }
};
exports.corsConfig = {
    origin: '*',
    allowedHeaders: [
        'Authorization', 'Access-Control-Allow-Origin', 'Content-Type', 'Cache-Control', 'X-Requested-With',
    ],
    credentials: true,
    exposedHeaders: [
        'Content-Disposition', 'Location', 'Authorization',
    ],
    methods: [
        'GET', 'POST', 'PUT', 'PATCH', 'DELETE',
    ],
};
