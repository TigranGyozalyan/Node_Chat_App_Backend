import {
  Document, model, Types, Schema, Model,
} from 'mongoose';
import { IUser } from './User';

export interface IRoom extends Document{
  users: Types.Array<IUser['_id']>
}

export interface IRoomPopulated extends Document{
  users: Types.Array<IUser>
}

const RoomSchema = new Schema({
  users: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
});

export interface IRoomModel extends Model<IRoom>{ }

export default model<IRoom, IRoomModel>('Room', RoomSchema);
