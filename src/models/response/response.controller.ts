import { Controller, Get, Param } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from './entities/response.entity';

@Controller('surveys')
export class ResponsesController {
  constructor(private readonly responseService: ResponsesService) {}

  @ApiResponse({
    status: 200,
    description: 'Get response by id',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id/response')
  async getById(@Param('id') id: string): Promise<Response> {
    return await this.responseService.getById(id);
  }
}
