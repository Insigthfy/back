import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateQuestionDto, CreateSurveyDto } from './dto/entity.dto';
import { SurveyParamsDto } from './dto/params.dto';
import { EmailService } from '../mailer/mailer.service';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { Survey } from './entities/survey.entity';
import { SurveyResponse } from './dto/output.dto';
import { IsPublic } from 'src/common/decorators/public.decorator';

@ApiTags('Surveys')
@ApiBearerAuth()
@Controller('v1/surveys')
@UseInterceptors(new ResponseDTOInterceptor(SurveyResponse))
export class SurveysController {
  constructor(
    private readonly surveysService: SurveysService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [SurveyResponse],
  })
  find() {
    return this.surveysService.find();
  }

  @Get('/recents')
  @ApiResponse({
    status: 200,
    description: 'Surveys',
  })
  findRecents() {
    return this.surveysService.findRecents();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: SurveyResponse,
  })
  @IsPublic()
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
    type: SurveyResponse,
  })
  async create(@Req() req, @Body() survey: CreateSurveyDto): Promise<Survey> {
    return await this.surveysService.create(req.company, survey);
  }

  @Post('question/:id')
  @ApiBody({ type: CreateQuestionDto })
  @ApiParam({ name: 'id', type: String })
  async createQuestion(
    @Body() question: CreateQuestionDto,
    @Param() { id }: SurveyParamsDto,
  ) {
    return await this.surveysService.createQuestion(id, question);
  }

  @Post(':id/send')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: [String] })
  async sendEmails(
    @Param() { id }: SurveyParamsDto,
    @Body() emails: string[],
  ): Promise<void> {
    await this.emailService.sendSurveyEmails(emails, id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Survey })
  async patch(
    @Param() { id }: SurveyParamsDto,
    @Body() survey: Partial<Survey>,
  ) {
    return await this.surveysService.patch(id, survey);
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
