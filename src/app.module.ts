import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SurveyModule } from './models/survey/survey.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongoConfigModule } from './config/database/mongodb/config.module';
import { IntegrationsModule } from './models/integrations/integrations.module';
import { MongoConfigService } from './config/database/mongodb/config.service';
import { ResponseModule } from './models/response/response.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailConfigService } from './config/external_application/email/config.service';
import { MailConfigModule } from './config/external_application/email/config.module';
import { CostumersModule } from './models/costumers/costumers.module';
import { CompaniesController } from './models/companies/companies.controller';
import { CompaniesService } from './models/companies/companies.service';
import { CompaniesModule } from './models/companies/companies.module';

@Module({
  imports: [
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
    MongoConfigModule,
    MailConfigModule,
    IntegrationsModule,
    SurveyModule,
    ResponseModule,
    CostumersModule,
    CompaniesModule
  ],
  controllers: [AppController],
})
export class AppModule {}
