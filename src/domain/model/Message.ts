import {
  Document, Model, model, Schema,
} from 'mongoose';
import { IUser } from './User';
import { IRoom } from './Room';

export interface IMessage extends Document {
  content: string,
  user: IUser['_id'],
  room: IRoom['_id'],
}

export interface IMessageModel extends Model<IMessage> { }

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
});

export default model<IMessage, IMessageModel>('Message', MessageSchema);
