import {
  Document, Model, model, Schema,
} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import EncryptionUtil from '../../util/EncryptionUtil';

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
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

// eslint-disable-next-line func-names
userSchema.pre<IUser>('save', function (next): void {
  if (this.isModified('password')) {
    this.password = EncryptionUtil.encrypt(this.password);
  }
  next();
});

export default model<IUser>('User', userSchema);
