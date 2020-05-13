import { IMessage } from '../model/Message';
import { IUser } from '../model/User';
import { IRoom } from '../model/Room';

export interface MessageDto {
  content: IMessage['content'],
  postedAt: Date,
  byUser: IUser['_id'],
  roomId?: IRoom['_id']
}
