import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { SurveyModule } from '../survey/survey.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Template, TemplateSchema } from './entities/template.entity';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    SurveyModule,
    CompaniesModule
  ],
  providers: [IntegrationsService],
  controllers: [IntegrationsController],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
