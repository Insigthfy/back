import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './mailer.service';
import { SurveyModule } from '../survey/survey.module';
import { CompaniesModule } from '../companies/companies.module';
import {
  Template,
  TemplateSchema,
} from '../integrations/entities/template.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CostumersModule } from '../costumers/costumers.module';

@Module({
  imports: [
    forwardRef(() => SurveyModule),
    CompaniesModule,
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    CostumersModule,
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailerModule {}
