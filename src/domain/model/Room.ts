import {
  Document, model, Types, Schema, Model,
} from 'mongoose';
import { IUser } from './User';
import { IMessage } from './Message';

export interface IRoom extends Document {
  users: Array<IUser>,
  messages: Array<IMessage>
}

const RoomSchema = new Schema({
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message',
    },
  ],
});

RoomSchema.statics.findByUserId = async function (_id: string): Promise<IRoom[]> {
  const rooms = await this.find({ users: _id });
  return rooms;
};

export interface IRoomModel extends Model<IRoom>{
  findByUserId(_id: string): Promise<IRoom[]>
}

export default model<IRoom, IRoomModel>('Room', RoomSchema);
