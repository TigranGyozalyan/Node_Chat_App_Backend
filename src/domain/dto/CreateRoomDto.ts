import { IUser } from '../model/User';
import { IRoom } from '../model/Room';

export interface CreateRoomDto {
  _id? : IRoom['_id'];
  users: Array<IUser['_id']>;
}
