import { Inject, Service } from 'typedi';
import Mapper from '../mapper/Mapper';

@Service()
export default class MessageService {
  @Inject()
  mapper!: Mapper;

  // async getMessageByRoomId(roomId: IRoom['_id']): Promise<MessageDto[]> {
  //   const messages = await Message.findByRoomId(roomId);
  //   return messages.map(this.mapper.toMessageDto);
  // }
}
