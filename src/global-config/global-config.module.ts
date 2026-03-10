import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
          // envFilePath: ['env/.env'],
          // ignoreEnvFile: true,
          // validationSchema: Joi.object({
          //   DATABASE_TYPE: Joi.required(),
          //   DATABASE_HOST: Joi.required(),
          //   DATABASE_PORT: Joi.number().default(5432),
          //   DATABASE_USERNAME: Joi.required(),
          //   DATABASE_DATABASE: Joi.required(),
          //   DATABASE_PASSWORD: Joi.required(),
          //   DATABASE_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
          //   DATABASE_SYNCHRONIZE: Joi.number().min(0).max(1).default(0),
          // }),
        }),
  ],
})
export class GlobalConfigModule {}
