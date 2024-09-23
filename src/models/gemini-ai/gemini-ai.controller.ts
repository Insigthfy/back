import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GeminiAIService } from './gemini-ai.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GeminiAI')
@Controller('v1/analyze')
export class GeminiAIController {
  constructor(private readonly geminiAIService: GeminiAIService) {}

  @Post('/:idSurvey')
  async summarizeText(
    @Res() res: Response,
    @Param('idSurvey') idSurvey: string,
  ): Promise<Response<string>> {
    try {
      const summarizedText = await this.geminiAIService.summarizeText(idSurvey);
      return res.status(HttpStatus.OK).send(summarizedText);
    } catch (error) {
      throw error;
    }
  }

  @Post('/emotion/:idSurvey')
  async emotionText(
    @Res() res: Response,
    @Param('idSurvey') idSurvey: string,
  ): Promise<Response<string>> {
    try {
      const emotionText = await this.geminiAIService.emotionText(idSurvey);
      return res.status(HttpStatus.OK).send(emotionText);
    } catch (error) {
      throw error;
    }
  }
}
