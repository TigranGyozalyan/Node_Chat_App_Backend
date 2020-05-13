import { Inject, Service } from 'typedi';
import Mapper from '../mapper/Mapper';
import { MessageDto } from '../domain/dto/MessageDto';
import Message, { IMessage } from '../domain/model/Message';

@Service()
export default class MessageService {
  @Inject()
  mapper!: Mapper;

  async addMessage(dto: MessageDto): Promise<IMessage> {
    const { content, byUser, postedAt } = dto;
    const message = new Message({
      content,
      user: byUser,
      postedAt,
    });
    await message.save();
    return message;
  }
}
