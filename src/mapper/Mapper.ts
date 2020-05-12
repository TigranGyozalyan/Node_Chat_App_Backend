import { Service } from 'typedi';
import { IUser } from '../domain/model/User';
import { UserDto } from '../domain/dto/UserDto';
import { IRoom } from '../domain/model/Room';
import { RoomDto } from '../domain/dto/RoomDto';
import { IMessage } from '../domain/model/Message';
import { MessageDto } from '../domain/dto/MessageDto';

@Service()
export default class Mapper {
  toUserDto(user: IUser): UserDto {
    const {
      firstName, lastName, email, _id,
    } = user;
    return {
      _id,
      firstName,
      lastName,
      email,
    };
  }

  toRoomDto(room: IRoom): RoomDto {
    const {
      users, messages, _id,
    } = room;
    return {
      _id,
      users,
      messages: messages.map((message) => this.toMessageDto(message)),
    };
  }

  toMessageDto(message: IMessage): MessageDto {
    const {
      content,
      postedAt,
      user,
    } = message;

    return {
      content,
      postedAt,
      byUser: user,
    };
  }

  toPopulatedUserDto(user: IUser, rooms: Array<RoomDto>) {
    const userDto = this.toUserDto(user);
    return {
      ...userDto,
      rooms,
    };
  }
}
