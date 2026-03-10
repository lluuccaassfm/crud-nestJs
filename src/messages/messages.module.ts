import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PersonModule } from 'src/person/person.module';
import { ConfigModule } from '@nestjs/config';
import messageConfig from './message.config';

@Module({
  imports: [
    ConfigModule.forFeature(messageConfig),
    TypeOrmModule.forFeature([Message]),
    PersonModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
