import mongoose from 'mongoose';
import { Db } from 'mongodb';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(process.env.MONGODB_URL || '', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
