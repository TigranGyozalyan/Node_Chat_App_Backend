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
const Room_1 = __importDefault(require("../domain/model/Room"));
const Mapper_1 = __importDefault(require("../mapper/Mapper"));
const MessageService_1 = __importDefault(require("./MessageService"));
const AccessDeniedError_1 = __importDefault(require("../exception/AccessDeniedError"));
const UserService_1 = __importDefault(require("./UserService"));
let RoomService = class RoomService {
    async createRoom(dto, creatorId) {
        const { users } = dto;
        if (!users.includes(creatorId._id)) {
            throw new AccessDeniedError_1.default('Access Denied');
        }
        const room = new Room_1.default({
            users,
            messages: [],
        });
        await room.save();
        return dto;
    }
    async getRoomsByUserId(_id) {
        const rooms = await Room_1.default.findByUserId(_id);
        rooms.forEach((room) => room.populate('messages'));
        return rooms.map(this.mapper.toRoomDto);
    }
    async updateRoom(dto) {
        const { _id, users } = dto;
        const userDocuments = await this.userService.getUsersByIdList(users);
        await Room_1.default.updateOne({ _id }, {
            users: userDocuments,
        });
        return dto;
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Mapper_1.default)
], RoomService.prototype, "mapper", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MessageService_1.default)
], RoomService.prototype, "messageService", void 0);
__decorate([
    typedi_1.Inject((type) => UserService_1.default),
    __metadata("design:type", UserService_1.default)
], RoomService.prototype, "userService", void 0);
RoomService = __decorate([
    typedi_1.Service()
], RoomService);
exports.default = RoomService;
