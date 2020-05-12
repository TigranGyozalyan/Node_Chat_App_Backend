import { IMessage } from '../model/Message';
import { IUser } from '../model/User';

export interface MessageDto {
  content: IMessage['content'],
  postedAt: Date,
  byUser: IUser['_id'],
}
