"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    users: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Message',
        },
    ],
});
RoomSchema.statics.findByUserId = async function (_id) {
    const rooms = await this.find({ users: _id });
    return rooms;
};
exports.default = mongoose_1.model('Room', RoomSchema);
