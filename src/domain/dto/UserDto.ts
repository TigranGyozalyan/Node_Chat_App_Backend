import { IUser } from '../model/User';

export interface UserDto {
  firstName: IUser['firstName'],
  lastName: IUser['lastName'],
  email: IUser['email'],
  password: IUser['password'],
}
