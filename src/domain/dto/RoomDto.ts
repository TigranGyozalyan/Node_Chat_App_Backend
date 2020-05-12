import { MessageDto } from './MessageDto';
import { UserDto } from './UserDto';
import { IRoom } from '../model/Room';

export interface RoomDto {
  _id?: IRoom['_id'],
  users: Array<UserDto>,
  messages: MessageDto[]
}
