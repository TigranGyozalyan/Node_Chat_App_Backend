"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const User_1 = __importDefault(require("../domain/model/User"));
const Mapper_1 = __importDefault(require("../mapper/Mapper"));
const NotFoundError_1 = __importDefault(require("../exception/NotFoundError"));
const RoomService_1 = __importDefault(require("./RoomService"));
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
    async getUserByCredentials(principal) {
        const user = await User_1.default.findByCredentials(principal);
        if (user) {
            return this.mapper.toUserDto(user);
        }
        throw new NotFoundError_1.default('User not found');
    }
    async getUserById(_id) {
        const user = await User_1.default.findById(_id);
        if (user) {
            return this.mapper.toUserDto(user);
        }
        throw new NotFoundError_1.default('User not found');
    }
    async getUsersByIdList(_ids) {
        const users = await User_1.default.findByIdList(_ids);
        if (users) {
            return users;
        }
        throw new NotFoundError_1.default('Users not found');
    }
    async getPopulatedUser(_id) {
        const user = await User_1.default.findById(_id);
        if (user) {
            const rooms = await this.roomService.getRoomsByUserId(_id);
            return this.mapper.toPopulatedUserDto(user, rooms);
        }
        throw new NotFoundError_1.default('User not found');
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Mapper_1.default)
], UserService.prototype, "mapper", void 0);
__decorate([
    typedi_1.Inject((type) => RoomService_1.default),
    __metadata("design:type", RoomService_1.default)
], UserService.prototype, "roomService", void 0);
UserService = __decorate([
    typedi_1.Service()
], UserService);
exports.default = UserService;
