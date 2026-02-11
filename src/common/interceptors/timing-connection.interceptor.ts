import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        console.log(`A requisição levou ${elapsedTime}ms de execução`);
      }),
    );
  }
}
