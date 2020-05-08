import { Service } from 'typedi';
import User, { IUser } from '../domain/model/User';
import { UserDto } from '../domain/dto/UserDto';


@Service()
export default class UserService {
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
}
