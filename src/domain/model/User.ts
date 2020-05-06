import {
  Document, model, Schema, Model,
} from 'mongoose';
import EncryptionService from '../../service/EncryptionService';

export interface IUser extends Document{
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line func-names
UserSchema.pre<IUser>('save', function (next: Function): void {
  if (this.isModified('password')) {
    this.password = EncryptionService.encrypt(this.password);
  }
  next();
});

export interface IUserModel extends Model<IUser> { }

export default model<IUser, IUserModel>('User', UserSchema);
