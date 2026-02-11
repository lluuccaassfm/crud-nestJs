import { Message } from 'src/messages/entities/message.entity';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandlingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => this.logger.log('Requisição processada com sucesso')),
      catchError((error: any) => {
        this.logger.error('Erro capturado no interceptor:', error.message);

        if (error.name === 'NotFoundException') {
          return throwError(
            () => new BadRequestException('Not Found: ' + error.message),
          );
        }
        
        return throwError(() => error);
      }),
    );
  }
}
