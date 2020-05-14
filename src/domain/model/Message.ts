import {
  Document, Model, model, Schema,
} from 'mongoose';
import { IUser } from './User';

export interface IMessage extends Document {
  content: string,
  user: IUser['_id'],
  postedAt: Date,
}

export interface IMessageModel extends Model<IMessage> {
}

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
  postedAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export default model<IMessage, IMessageModel>('Message', MessageSchema);
