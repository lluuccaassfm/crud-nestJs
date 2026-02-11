import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import type { Request } from 'express';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { ReqDataParam } from 'src/common/params/req-data-param.decorator';

@UseInterceptors(AuthTokenInterceptor)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @HttpCode(HttpStatus.OK)
  @UseGuards(IsAdminGuard)
  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @Req() req: Request,
    @ReqDataParam('url') url,
  ) {
    console.log('RecadosController', req['user']);
    console.log('Request URL: ' + url);
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
