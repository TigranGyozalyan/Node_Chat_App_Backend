import { Service } from 'typedi';
import { IUser } from '../domain/model/User';
import { UserDto } from '../domain/dto/UserDto';

@Service()
export default class Mapper {
  toDto(user: IUser): UserDto {
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
}
