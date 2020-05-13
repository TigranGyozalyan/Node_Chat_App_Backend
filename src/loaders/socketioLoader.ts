import socketIo from 'socket.io';
import { Server } from 'http';
import instantiate from '../controller/SocketController';


export default (server: Server): void => {
  const io = socketIo(server);
  instantiate(io);
};
