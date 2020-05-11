"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let JWTService = class JWTService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    generateToken(user) {
        const { _id } = user;
        const payload = { _id };
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: '1 day' });
    }
    validateToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
};
JWTService = __decorate([
    typedi_1.Service()
], JWTService);
exports.default = JWTService;
