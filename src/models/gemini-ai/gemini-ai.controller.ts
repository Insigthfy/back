import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GeminiAIService } from './gemini-ai.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('GeminiAI')
@ApiBearerAuth()
@Controller('v1/analyze')
export class GeminiAIController {
  constructor(private readonly geminiAIService: GeminiAIService) {}

  @Post('/:idSurvey')
  async summarizeText(
    @Res() res: Response,
    @Param('idSurvey') idSurvey: string,
  ): Promise<Response<string>> {
    const summarizedText = await this.geminiAIService.summarizeText(idSurvey);
    return res.status(HttpStatus.OK).send(summarizedText);
  }

  @Post('/emotion/:idSurvey')
  async emotionText(
    @Res() res: Response,
    @Param('idSurvey') idSurvey: string,
  ): Promise<Response<string>> {
    const emotionText = await this.geminiAIService.emotionText(idSurvey);
    return res.status(HttpStatus.OK).send(emotionText);
  }

  @Post('/promotor/:idSurvey')
  async classificationPromotorOrNot(
    @Res() res: Response,
    @Param('idSurvey') idSurvey: string,
  ): Promise<Response<string>> {
    const classificationPromotorOrNot =
      await this.geminiAIService.classificationPromotorOrNot(idSurvey);
    return res.status(HttpStatus.OK).send(classificationPromotorOrNot);
  }
}
