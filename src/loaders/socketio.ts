import socketIo from 'socket.io';
import { Server } from 'http';

export default async (server: Server): Promise<any> => socketIo(server);
