import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './survey.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './entities/survey.entity';
import { EmailService } from '../mailer/mailer.service';
import { MailerModule } from '../mailer/mailer.module';
import { CompaniesModule } from '../companies/companies.module';
import {
  Template,
  TemplateSchema,
} from '../integrations/entities/template.entity';
import { CostumersModule } from '../costumers/costumers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
    MailerModule,
    CompaniesModule,
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    CostumersModule,
  ],
  providers: [SurveysService, EmailService],
  controllers: [SurveysController],
  exports: [SurveysService, EmailService],
})
export class SurveyModule {}
