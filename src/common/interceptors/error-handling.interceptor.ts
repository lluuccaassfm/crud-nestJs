/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ErrorHandlingInterceptor - START');

    return next.handle().pipe(
      catchError((error) => {
        console.log('An error occurred:', error.message);
        return throwError(() => {
          if (error.name == 'NotFoundException') {
            return new BadRequestException(error.message);
          }
          return new BadRequestException('Ocorreu um erro desconhecido.');
        });
      }),
    );
  }
}
