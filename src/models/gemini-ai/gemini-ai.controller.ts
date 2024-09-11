import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GeminiAIService } from './gemini-ai.service';
import { Response } from 'express';

@Controller('analyze')
export class GeminiAIController {
  constructor(private readonly geminiAIService: GeminiAIService) {}

  @Post()
  async summarizeText(
    @Res() res: Response,
    @Body('idSurvey') idSurvey: number,
  ): Promise<Response<string>> {
    try {
      const summarizedText = await this.geminiAIService.summarizeText(idSurvey);
      return res.status(HttpStatus.OK).send(summarizedText);
    } catch (error) {
      throw error;
    }
  }

  @Post('/emotion')
  async emotionText(
    @Res() res: Response,
    @Body('idSurvey') idSurvey: number,
  ): Promise<Response<string>> {
    try {
      const emotionText = await this.geminiAIService.emotionText(idSurvey);
      return res.status(HttpStatus.OK).send(emotionText);
    } catch (error) {
      throw error;
    }
  }
}
