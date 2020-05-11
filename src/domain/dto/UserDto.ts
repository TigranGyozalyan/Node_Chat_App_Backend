import { IUser } from '../model/User';

export interface UserDto {
  _id?: IUser['_id'],
  firstName?: IUser['firstName'],
  lastName?: IUser['lastName'],
  email?: IUser['email'],
  password?: IUser['password'],
}
