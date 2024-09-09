import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './survey.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Survey, SurveySchema } from "./entities/survey.entity";

@Module({
  imports: [MongooseModule.forFeature([ { name: Survey.name, schema: SurveySchema } ])],
  providers: [SurveysService],
  controllers: [SurveysController],
  exports: [SurveysService],
})
export class SurveyModule {}
