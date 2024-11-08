import { Module } from "@nestjs/common";
import { Response, ResponseSchema } from './entities/response.entity';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './response.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyModule } from '../survey/survey.module';
import { TopicsModule } from '../topics/topics.module';
import { ResponsePromoterModule } from "../responsePromoter/response-promoter.module";
import { ResponsePromoterService } from "../responsePromoter/response-promoter.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Response.name, schema: ResponseSchema },
    ]),
    SurveyModule,
    TopicsModule,
    ResponsePromoterModule
  ],
  providers: [ResponsesService, ResponsePromoterService],
  controllers: [ResponsesController],
  exports: [ResponsesService],
})
export class ResponseModule {}
