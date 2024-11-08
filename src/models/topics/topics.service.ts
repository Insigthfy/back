import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from './entities/topic.entity';
import { Model } from 'mongoose';
import { CreateTopicDto } from './dto/entity.dto';
import { SurveysService } from '../survey/surveys.service';
import { TopicResponse } from './dto/output.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name)
    private readonly topicsRepository: Model<Topic>,
    private readonly surveysService: SurveysService,
  ) {}

  async find(): Promise<TopicResponse[]> {
    return await this.topicsRepository.find();
  }

  async findBySurvey(survey: string) {
    return await this.topicsRepository.find({ survey });
  }

  async create(topic: CreateTopicDto) {
    await this.surveysService.getById(topic.survey);

    return await this.topicsRepository.create(topic);
  }
}
