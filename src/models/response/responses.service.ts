import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './entities/response.entity';
import { Model } from 'mongoose';
import { CreateResponseDto } from './dto/create.response.dto';
import { ResponseResponse } from './dto/output.dto';
import { SurveysService } from '../survey/surveys.service';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
    private readonly surveysService: SurveysService,
  ) {}

  async getSurveyById(id: string): Promise<ResponseResponse[]> {
    return this.responseRepository.find({ survey: id });
  }

  async create(response: CreateResponseDto) {
    await this.surveysService.getById(response.survey);

    return await this.responseRepository.create(response);
  }
}
