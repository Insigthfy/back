import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/entity.dto';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { TopicReponse } from './dto/output.dto';
import { ParamsDto } from './dto/params.dto';

@ApiTags("Topics")
@Controller('v1/topics')
@UseInterceptors(new ResponseDTOInterceptor(TopicReponse))
export class TopicsController {
    constructor(private readonly topicsService: TopicsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [TopicReponse]
    })
    find() {
        return this.topicsService.find();
    }

    @Get("/survey/:id")
    @ApiParam({
        name: "id",
        type: String,
        required: true
    })
    findBySurvey(@Param() { id }: ParamsDto) {
        return this.topicsService.findBySurvey(id);
    }

    @Post()
    @ApiBody({
        type: CreateTopicDto,
        required: true
    })
    @ApiResponse({
        status: 201,
        type: [TopicReponse]
    })
    create(@Body() topic: CreateTopicDto) {
        return this.topicsService.create(topic);
    }
}
