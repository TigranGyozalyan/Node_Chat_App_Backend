import { Inject, Service } from 'typedi';
import User, { IUser } from '../domain/model/User';
import { UserDto } from '../domain/dto/UserDto';
import { UserPrincipal } from '../domain/dto/UserPrincipal';
import Mapper from '../mapper/Mapper';
import UserNotFoundError from '../exception/UserNotFoundError';
import { PopulatedUserDto } from '../domain/dto/PopulatedUserDto';
import RoomService from './RoomService';


@Service()
export default class UserService {
  @Inject()
  mapper!: Mapper;

  @Inject((type) => RoomService)
  roomService!: RoomService;

  async createUser(dto: UserDto): Promise<IUser> {
    const {
      firstName, lastName, email, password,
    } = dto;
    const newUser: IUser = new User(
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    await newUser.save();
    return newUser;
  }

  async getUserByCredentials(principal: UserPrincipal): Promise<UserDto> {
    const user = await User.findByCredentials(principal);

    if (user) {
      return this.mapper.toUserDto(user);
    }
    throw new UserNotFoundError('User not found');
  }

  async getUserById(_id: IUser['_id']): Promise<UserDto> {
    const user = await User.findById(_id);

    if (user) {
      return this.mapper.toUserDto(user);
    }
    throw new UserNotFoundError('User not found');
  }

  async getUsersByIdList(_ids: Array<IUser['_id']>): Promise<Array<IUser>> {
    return await User.findByIdList(_ids);
  }


  async getPopulatedUser(_id: IUser['_id']): Promise<PopulatedUserDto> {
    const user = await User.findById(_id);

    if (user) {
      const rooms = await this.roomService.getRoomsByUserId(_id);
      return this.mapper.toPopulatedUserDto(user, rooms);
    }
    throw new UserNotFoundError('User not found');
  }
}
