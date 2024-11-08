import { forwardRef, Module } from "@nestjs/common";
import { ResponsePromoterService } from "./response-promoter.service";
import { GeminiAIService } from "../gemini-ai/gemini-ai.service";
import { GeminiAIModule } from "../gemini-ai/gemini-ai.module";
import { ResponseModule } from "../response/response.module";


@Module({
  imports: [forwardRef(() => ResponseModule), GeminiAIModule],
  providers: [ResponsePromoterService, GeminiAIService],
  exports: [ResponsePromoterService, GeminiAIService]
}) export class ResponsePromoterModule {}