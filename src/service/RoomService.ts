import { Inject, Service } from 'typedi';
import { RoomDto } from '../domain/dto/RoomDto';
import Room from '../domain/model/Room';
import Mapper from '../mapper/Mapper';
import MessageService from './MessageService';
import { CreateRoomDto } from '../domain/dto/CreateRoomDto';
import { IUser } from '../domain/model/User';
import AccessDeniedError from '../exception/AccessDeniedError';
import UserService from './UserService';

@Service()
export default class RoomService {
  @Inject()
  mapper!: Mapper;

  @Inject()
  messageService!: MessageService;

  @Inject((type) => UserService)
  userService!: UserService;

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
    rooms.forEach((room) => room.populate('messages'));
    return rooms.map(this.mapper.toRoomDto);
  }

  async updateRoom(dto: RoomDto): Promise<RoomDto> {
    const { _id, users } = dto;

    const userDocuments = await this.userService.getUsersByIdList(users);
    await Room.updateOne({ _id }, {
      users: userDocuments,
    });
    return dto;
  }
}
