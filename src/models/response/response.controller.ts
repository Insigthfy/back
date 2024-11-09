import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseParamsDto } from './dto/params.dto';
import { CreateResponseDto } from './dto/create.response.dto';
import { ResponseResponse } from './dto/output.dto';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('Responses')
@ApiBearerAuth()
@Controller('v1/responses')
@UseInterceptors(new ResponseDTOInterceptor(ResponseResponse))
export class ResponsesController {
  constructor(private readonly responseService: ResponsesService) {}

  @Get(':id/survey')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: [ResponseResponse],
  })
  async getSurveyById(@Param() { id }: ResponseParamsDto) {
    return await this.responseService.getSurveyById(id);
  }

  @Post()
  @ApiBody({
    type: CreateResponseDto,
  })
  @ApiResponse({
    status: 204,
    type: CreateResponseDto,
  })
  async create(@Body() response: CreateResponseDto) {
    return await this.responseService.create(response);
  }

  @Get('distribution')
  async getNpsDistribution() {
    return this.responseService.getNpsDistribution();
  }

  @Get('top-period')
  async getTopResponsePeriod() {
    return this.responseService.getTopResponsePeriod();
  }

  @Get('evolution')
  async getNpsEvolution() {
    return this.responseService.getNpsEvolution();
  }
}
