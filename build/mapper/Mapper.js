"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
let Mapper = class Mapper {
    toUserDto(user) {
        const { firstName, lastName, email, _id, } = user;
        return {
            _id,
            firstName,
            lastName,
            email,
        };
    }
    toRoomDto(room) {
        const { users, messages, _id, } = room;
        return {
            _id,
            users,
            messages: messages.map((message) => this.toMessageDto(message)),
        };
    }
    toMessageDto(message) {
        const { content, postedAt, user, } = message;
        return {
            content,
            postedAt,
            byUser: user,
        };
    }
    toPopulatedUserDto(user, rooms) {
        const userDto = this.toUserDto(user);
        return {
            ...userDto,
            rooms,
        };
    }
};
Mapper = __decorate([
    typedi_1.Service()
], Mapper);
exports.default = Mapper;
