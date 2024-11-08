import { CompaniesModule } from './companies/companies.module';
import { CostumersModule } from './costumers/costumers.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ResponseModule } from './response/response.module';
import { SurveyModule } from './survey/survey.module';
import { TopicsModule } from './topics/topics.module';
import { GeminiAIModule } from './gemini-ai/gemini-ai.module';
import { ResponsePromoterModule } from "./responsePromoter/response-promoter.module";

export default [
  CompaniesModule,
  CostumersModule,
  IntegrationsModule,
  MailerModule,
  SurveyModule,
  TopicsModule,
  ResponseModule,
  ResponsePromoterModule,
  GeminiAIModule,
];
