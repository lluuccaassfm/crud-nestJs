import { ErrorHandlingInterceptor } from './common/interceptors/error-handling.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';
import { TimingConnectionInterceptor } from './common/interceptors/timing-connection.interceptor';
import { ChangeDataInterceptor } from './common/interceptors/change-data.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // levanta erro quando a chave não existir
      transform: false, // tenta transformar os tipos de dados de param e dtos
    }),
    new ParseIntIdPipe(),
  );
  app.useGlobalInterceptors(
    new TimingConnectionInterceptor(),
    new ErrorHandlingInterceptor(),
    new ChangeDataInterceptor(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
