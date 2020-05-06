"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EncryptionService_1 = __importDefault(require("../../service/EncryptionService"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = EncryptionService_1.default.encrypt(this.password);
    }
    next();
});
exports.default = mongoose_1.model('User', UserSchema);
