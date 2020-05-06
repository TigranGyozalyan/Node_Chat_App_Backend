"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
});
exports.default = mongoose_1.model('Message', MessageSchema);
