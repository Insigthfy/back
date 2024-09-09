import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import {ApiBody, ApiParam, ApiResponse} from '@nestjs/swagger';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { SurveyParamsDto } from './dto/params.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @ApiResponse({
    status: 200,
    type: Survey,
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Survey> {
    return await this.surveysService.getById(id);
  }

  @ApiResponse({
    status: 201,
    type: Survey,
  })
  @ApiBody({ type: CreateSurveyDto })
  @Post()
  async create(@Body('survey') survey: CreateSurveyDto): Promise<Survey> {
    return await this.surveysService.create(survey);
  }

  @ApiResponse({
    status: 204,
    description: 'Survey deleted',
  })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async delete(@Param() { id }: SurveyParamsDto): Promise<void> {
    return await this.surveysService.delete(id);
  }
}
