import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSurveyDto } from './dto/entity.dto';
import { SurveyParamsDto } from './dto/params.dto';
import { Response } from "../response/entities/response.entity";
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { Survey } from './entities/survey.entity';
import { SurveyResponse } from './dto/output.dto';

@ApiTags('Surveys')
@Controller('v1/surveys')
@UseInterceptors(new ResponseDTOInterceptor(SurveyResponse))
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [SurveyResponse],
  })
  find() {
    return this.surveysService.find();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: Survey,
  })
  @ApiResponse({
    status: 404,
    description: 'Survey not found',
  })
  async getById(@Param() { id }: SurveyParamsDto): Promise<Survey> {
    return await this.surveysService.getById(id);
  }

  @Post()
  @ApiBody({ type: CreateSurveyDto })
  @ApiResponse({
    status: 201,
    type: Survey,
  })
  async create(@Body() survey: CreateSurveyDto): Promise<Survey> {
    return await this.surveysService.create(survey);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiResponse({
    status: 204,
    description: 'Survey deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Survey not found',
  })
  async delete(@Param() { id }: SurveyParamsDto): Promise<void> {
    return await this.surveysService.delete(id);
  }
}
