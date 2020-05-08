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
const User_1 = __importDefault(require("../domain/model/User"));
let UserService = class UserService {
    async createUser(dto) {
        const { firstName, lastName, email, password, } = dto;
        const newUser = new User_1.default({
            firstName,
            lastName,
            email,
            password,
        });
        await newUser.save();
        return newUser;
    }
};
UserService = __decorate([
    typedi_1.Service()
], UserService);
exports.default = UserService;
