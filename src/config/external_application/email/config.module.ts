import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailConfigService } from './config.service';
import mailConfiguration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mailConfiguration],
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().default(587),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().default('no-reply@example.com'),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [MailConfigService],
})
export class MailConfigModule {}
