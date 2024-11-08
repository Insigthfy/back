  import { forwardRef, Module } from "@nestjs/common";
  import { GeminiAIController } from './gemini-ai.controller';
  import { GeminiAIService } from './gemini-ai.service';
  import { ResponseModule } from '../response/response.module';
  import { ResponsesService } from "../response/responses.service";
  import { MongooseModule } from "@nestjs/mongoose";
  import { Response, ResponseSchema } from "../response/entities/response.entity";
  import { SurveyModule } from "../survey/survey.module";
  import { TopicsModule } from "../topics/topics.module";
  import { ResponsePromoterModule } from "../responsePromoter/response-promoter.module";

  @Module({
    imports: [
      forwardRef(() => ResponseModule),
      MongooseModule.forFeature([
        { name: Response.name, schema: ResponseSchema },
      ]),
      SurveyModule,
      TopicsModule,
      forwardRef(() => ResponsePromoterModule)
    ],
    controllers: [GeminiAIController],
    providers: [
      GeminiAIService,
      ResponsesService
    ],
    exports: [GeminiAIService],
  })
  export class GeminiAIModule {}
