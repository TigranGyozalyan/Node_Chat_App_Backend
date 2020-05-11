import { Inject, Service} from 'typedi';
import User, { IUser } from '../domain/model/User';
import { UserDto } from '../domain/dto/UserDto';
import { UserPrincipal } from '../domain/dto/UserPrincipal';
import Mapper from '../mapper/Mapper';
import { UserNotFoundError } from '../exception/UserNotFoundError';


@Service()
export default class UserService {
  @Inject()
  mapper!: Mapper;

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
      return this.mapper.toDto(user);
    }
    throw new UserNotFoundError('User not found');
  }

  async getUserById(_id: string): Promise<UserDto> {
    const user = await User.findById(_id);

    if (user) {
      return this.mapper.toDto(user);
    }
    throw new UserNotFoundError('User not found');
  }
}
