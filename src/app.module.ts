import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SurveyModule } from './models/survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoConfigModule } from './config/database/mongodb/config.module';
import { IntegrationsModule } from './models/integrations/integrations.module';
import { MongoConfigService } from './config/database/mongodb/consig.service';
import { ResponseModule } from './models/response/response.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CostumersModule } from './models/costumers/costumers.module';
import { CompaniesController } from './models/companies/companies.controller';
import { CompaniesService } from './models/companies/companies.service';
import { CompaniesModule } from './models/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (configService: MongoConfigService) => ({
        uri: configService.uri
      }),
      inject: [MongoConfigService],
    }),
    MongoConfigModule,
    IntegrationsModule,
    SurveyModule,
    ResponseModule,
    CostumersModule,
    CompaniesModule
  ],
  controllers: [AppController],
})
export class AppModule {}
