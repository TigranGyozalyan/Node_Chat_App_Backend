/* eslint-disable func-names */
import {
  Document, Model, model, Schema,
} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import EncryptionUtil from '../../util/EncryptionUtil';
import { UserPrincipal } from '../dto/UserPrincipal';

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(principal: UserPrincipal): Promise<IUser>
}

const userSchema: Schema = new Schema({
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
    validator: {
      validate: (email: string) => {
        if (isEmail(email)) {
          return true;
        }
        throw new Error('Invalid email');
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<IUser>('save', function (next): void {
  if (this.isModified('password')) {
    this.password = EncryptionUtil.encrypt(this.password);
  }
  next();
});

userSchema.statics.findByCredentials = async function (principal: UserPrincipal): Promise<IUser> {
  const user: IUser[] = await this.find({ email: principal.email, password: principal.password });
  return user[0];
};

export default model<IUser, IUserModel>('User', userSchema);
