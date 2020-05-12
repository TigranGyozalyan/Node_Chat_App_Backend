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
  findByCredentials(principal: UserPrincipal): Promise<IUser>,
  findByIdList(ids: Array<IUser['_id']>): Promise<Array<IUser>>
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
  const user: IUser = await this.findOne({ email: principal.email, password: principal.password });
  return user;
};

userSchema.statics.findByIdList = async function (ids: Array<IUser['_id']>): Promise<Array<IUser>> {
  const users = await this.find({
    _id: {
      $in: ids,
    },
  });
  return users;
};

export default model<IUser, IUserModel>('User', userSchema);
