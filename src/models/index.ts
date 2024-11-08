import { CompaniesModule } from "./companies/companies.module";
import { IntegrationsModule } from "./integrations/integrations.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { ResponseModule } from "./response/response.module";
import { SurveyModule } from "./survey/survey.module";
import { TopicsModule } from "./topics/topics.module";
import { CostumersModule } from "./costumers/costumers.module";
import { UsersModule } from "./users/users.module";
import { BasesModule } from "./bases/bases.module";
import { GeminiAIModule } from './gemini-ai/gemini-ai.module';

export default [
    CompaniesModule,
    CostumersModule,
    IntegrationsModule,
    MailerModule,
    ResponseModule,
    SurveyModule,
    TopicsModule,
    GeminiAIModule,
    UsersModule,
    BasesModule
];
