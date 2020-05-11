"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable func-names */
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const EncryptionUtil_1 = __importDefault(require("../../util/EncryptionUtil"));
const userSchema = new mongoose_1.Schema({
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
        lowercase: true,
        validator: {
            validate: (email) => {
                if (isEmail_1.default(email)) {
                    return true;
                }
                throw new Error('Invalid email');
            },
        },
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = EncryptionUtil_1.default.encrypt(this.password);
    }
    next();
});
userSchema.statics.findByCredentials = async function (principal) {
    const user = await this.find({ email: principal.email, password: principal.password });
    return user[0];
};
exports.default = mongoose_1.model('User', userSchema);
