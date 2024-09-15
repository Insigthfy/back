import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { SurveyParamsDto } from './dto/params.dto';
import { Response } from "../response/entities/response.entity";

@ApiTags('Surveys')
@Controller('v1/surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

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

  // @ApiResponse({
  //   status: 200,
  //   type: [Survey],
  // })
  // @ApiParam({ name: 'id', type: String })
  // @Get(':id/group')
  // async getGroup(@Param('id') id: string): Promise<Survey[]> {
  //
  // }

  @Get(':id/responses')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: [Survey],
  })
  @ApiResponse({
    status: 404,
    description: 'Survey not found',
  })
  async getResponses(@Param() { id }: SurveyParamsDto): Promise<Response[]> {
    return await this.surveysService.getResponses(id);
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
