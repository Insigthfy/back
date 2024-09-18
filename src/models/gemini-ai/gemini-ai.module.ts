import { Module } from '@nestjs/common';
import { GeminiAIController } from './gemini-ai.controller';
import { GeminiAIService } from './gemini-ai.service';
import { ResponseModule } from '../response/response.module';

@Module({
  controllers: [GeminiAIController],
  providers: [GeminiAIService],
  imports: [ResponseModule],
})
export class GeminAIModule {}
