import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { SimpleMiddleware } from './common/middlewares/simple.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ErrorExceptionFilter } from './common/filters/error-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
      synchronize: true, // Sincroniza com o BD. Não deve ser usado em produção
    }),
    MessagesModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: IsAdminGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes('*');
    // consumer.apply(AnotherMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.ALL,
    // });
  }
}
