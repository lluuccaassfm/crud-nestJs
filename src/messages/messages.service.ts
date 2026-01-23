import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  throwNotFountError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    // const message = this.messages.find((item) => item.id === id);

    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (message) return message;

    this.throwNotFountError();
  }

  async create(body: CreateMessageDto) {
    const newMessageRequest = {
      ...body,
      lido: false,
      data: new Date(),
    };
    const newMessage = this.messageRepository.create(newMessageRequest);
    return this.messageRepository.save(newMessage);
  }

  async update(id: number, body: UpdateMessageDto) {
    const partialUpdateMessageDTO = {
      lido: body?.lido,
      texto: body?.texto,
    };

    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDTO,
    });

    if (!message) return this.throwNotFountError();

    await this.messageRepository.save(message);
    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) return this.throwNotFountError();

    return this.messageRepository.remove(message);
  }
}
