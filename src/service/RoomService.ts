import { Inject, Service } from 'typedi';
import { RoomDto } from '../domain/dto/RoomDto';
import Room, { IRoom } from '../domain/model/Room';
import Mapper from '../mapper/Mapper';
import MessageService from './MessageService';
import { CreateRoomDto } from '../domain/dto/CreateRoomDto';
import { IUser } from '../domain/model/User';
import AccessDeniedError from '../exception/AccessDeniedError';
import UserService from './UserService';
import { MessageDto } from '../domain/dto/MessageDto';
import NotFoundError from '../exception/NotFoundError';

@Service()
export default class RoomService {
  @Inject()
  mapper!: Mapper;

  @Inject()
  messageService!: MessageService;

  @Inject((type) => UserService)
  userService!: UserService;

  private async getRoomById(_id: IRoom['_id']): Promise<IRoom> {
    const room = await Room.findById(_id);

    if (room) {
      return room;
    }

    throw new NotFoundError('Room not found');
  }

  async createRoom(dto: CreateRoomDto, creatorId: IUser['_id']): Promise<CreateRoomDto> {
    const { users } = dto;
    if (!users.includes(creatorId._id)) {
      throw new AccessDeniedError('Access Denied');
    }
    const room = new Room({
      users,
      messages: [],
    });
    await room.save();
    return dto;
  }

  async getRoomsByUserId(_id: string): Promise<Array<RoomDto>> {
    const rooms = await Room.findByUserId(_id);
    const populationPromises = rooms.map((room) => {
      room.populate('messages');
      return room.execPopulate();
    });
    await Promise.all(populationPromises);
    return rooms.map(this.mapper.toRoomDto);
  }

  async updateRoom(dto: RoomDto): Promise<RoomDto> {
    const { _id, users } = dto;

    const userDocuments = await this.userService.getUsersByIdList(users);

    const room = await this.getRoomById(_id);

    room.users = userDocuments;

    await room.save();
    return this.mapper.toRoomDto(room);
  }

  async addMessageToRoom(messageDto: MessageDto): Promise<RoomDto> {
    const message = await this.messageService.addMessage(messageDto);

    const room = await this.getRoomById(messageDto.roomId);

    const { _id: messageId } = message;
    room.messages = [...room.messages, messageId];

    await room.save();

    return this.mapper.toRoomDto(room);
  }
}
