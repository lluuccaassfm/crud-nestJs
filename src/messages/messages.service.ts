import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly personService: PersonService,
  ) {}

  throwNotFountError(): never {
    throw new NotFoundException('Message not found');
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = 10,
      page = 0,
      orderBy = 'id',
      orderDirection = 'DESC',
    } = paginationDto;

    const skip = limit * page;

    const messages = await this.messageRepository.find({
      take: limit,
      skip: skip,
      relations: ['de', 'para'],
      order: { [orderBy]: orderDirection },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number): Promise<Message> {
    // const message = this.messages.find((item) => item.id === id);

    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!message) return this.throwNotFountError();

    return message;
  }

  async create(body: CreateMessageDto) {
    const { deId, paraId } = body;

    const de = await this.personService.findOne(deId);
    const para = await this.personService.findOne(paraId);

    const newMessageRequest = {
      texto: body.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };
    const newMessage = this.messageRepository.create(newMessageRequest);
    await this.messageRepository.save(newMessage);

    return {
      ...newMessage,
      de: {
        id: newMessage.de.id,
        nome: newMessage.de.nome,
      },
      para: {
        id: newMessage.para.id,
        nome: newMessage.para.nome,
      },
    };
  }

  async update(id: number, body: UpdateMessageDto) {
    const message = await this.findOne(id);

    message.texto = body?.texto ?? message.texto;
    message.lido = body?.lido ?? message.lido;

    await this.messageRepository.save(message);
    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) return this.throwNotFountError();

    return this.messageRepository.remove(message);
  }
}
