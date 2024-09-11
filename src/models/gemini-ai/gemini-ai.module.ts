import { Module } from '@nestjs/common';
import { GeminiAIController } from './gemini-ai.controller';
import { GeminiAIService } from './gemini-ai.service';

@Module({
  controllers: [GeminiAIController],
  providers: [GeminiAIService],
  imports: [],
})
export class GeminAIModule {}
