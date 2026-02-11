import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';

@UseInterceptors(AuthTokenInterceptor)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true })) body: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
