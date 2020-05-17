import socketIo from 'socket.io';
import { Container } from 'typedi';
import RoomService from '../service/RoomService';
import { MessageDto } from '../domain/dto/MessageDto';


const roomService: RoomService = Container.get(RoomService);

const instantiate = (io: socketIo.Server) => {
  io.on('connect', (socket) => {
    console.log('New connection');

    socket.on('join', (data: string[]) => {
      console.log(data);
      socket.join(data);
    });

    socket.on('send', async (message: MessageDto) => {
      console.log(message);

      await roomService.addMessageToRoom(message);

      io.to(message.roomId).emit('success', message);
    });
  });
};

export default instantiate;
