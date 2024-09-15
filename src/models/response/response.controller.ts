import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ResponsesService } from './responses.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from './entities/response.entity';
import { ResponseParamsDto } from "./dto/params.dto";
import { CreateResponseDto } from "./dto/entity.dto";

@ApiTags('Responses')
@Controller('v1/responses')
export class ResponsesController {
  constructor(private readonly responseService: ResponsesService) {}

  @Get(':id/survey')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
  })
  async getSurveyById(@Param() { id }: ResponseParamsDto): Promise<Response> {
    return await this.responseService.getSurveyById(id);
  }

  @Post(':id/survey')
  @ApiBody({ type: CreateResponseDto })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 204,
  })
  async create(@Param() { id }: ResponseParamsDto, @Body() response: CreateResponseDto): Promise<void> {
    return await this.responseService.create(id, response);
  }
}
