import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;

  private messages: Message[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFountError() {
    throw new NotFoundException('Message not found');
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find((item) => item.id === id);

    if (message) return message;

    this.throwNotFountError();
  }

  create(body: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...body,
      lido: false,
      data: new Date(),
    };
    this.messages.push(novoRecado);

    return novoRecado;
  }

  update(id: number, body: UpdateMessageDto) {
    const recadoExistenteIndex = this.messages.findIndex(
      (item) => item.id === id,
    );

    if (recadoExistenteIndex < 0) {
      this.throwNotFountError();
    }

    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.messages[recadoExistenteIndex];

      this.messages[recadoExistenteIndex] = {
        ...recadoExistente,
        ...body,
      };
    }
  }

  remove(id: number) {
    const recadoExistenteIndex = this.messages.findIndex(
      (item) => item.id === id,
    );

    if (recadoExistenteIndex < 0) {
      this.throwNotFountError();
    }

    this.messages.splice(recadoExistenteIndex, 1);
    return `Recado ${id} removido com sucesso!`;
  }
}
