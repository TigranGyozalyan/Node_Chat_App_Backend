import { UserDto } from './UserDto';
import { RoomDto } from './RoomDto';

export interface PopulatedUserDto extends UserDto{
  rooms: RoomDto[];
}
