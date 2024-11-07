import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongoConfigModule } from './config/database/mongodb/config.module';
import { MongoConfigService } from './config/database/mongodb/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailConfigService } from './config/external_application/email/config.service';
import { MailConfigModule } from './config/external_application/email/config.module';
import modules from "./models";
import { AuthenticationModule } from './authentication/authentication.module';
import { BasesModule } from './models/bases/bases.module';

@Module({
  imports: [
    ...modules,
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (configService: MongoConfigService) => ({
        uri: configService.uri,
      }),
      inject: [MongoConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      useFactory: (config: MailConfigService) => ({
        transport: config.transportConfig,
        defaults: {
          from: config.from,
        },
      }),
      inject: [MailConfigService],
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
