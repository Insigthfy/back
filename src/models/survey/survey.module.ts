import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './survey.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './entities/survey.entity';
import { ResponsesService } from '../response/responses.service';
import { ResponseSchema } from '../response/entities/response.entity';
import { EmailService } from "../mailer/mailer.service";
import { MailerModule } from "../mailer/mailer.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: Response.name, schema: ResponseSchema }
    ]),
    MailerModule
  ],
  providers: [SurveysService, ResponsesService, EmailService],
  controllers: [SurveysController],
  exports: [SurveysService, ResponsesService, EmailService],
})
export class SurveyModule {}
