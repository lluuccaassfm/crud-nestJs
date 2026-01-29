import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimingConnectionInterceptor - START');

    const startTime = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        console.log(`A requisição levou ${elapsedTime}ms de execução`);
        console.log('TimingConnectionInterceptor - FINISH');
      }),
    );
  }
}
