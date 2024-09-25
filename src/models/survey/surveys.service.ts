import { Injectable, NotFoundException } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyStatusEnum } from './enums/survey-status.enum';
import { ResponseDtoOutput } from '../response/dto/response.dto.output';
import { Response } from '../response/entities/response.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey>,
    private readonly responseRepository: Model<Response>,
  ) {}

  async find(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async getById(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    return survey;
  }

  async getResponses(id: string): Promise<ResponseDtoOutput> {
    const responses = await this.responseRepository
      .find({ id: id })
      .select('-_id');
    const quantity = responses.length;
    if (responses.length === 0) {
      throw new NotFoundException(
        `Responses for survey with id ${id} not found`,
      );
    }
    return { quantity, responses };
  }
  async create({
    company,
    title,
    scheduledDate,
  }: CreateSurveyDto): Promise<Survey> {
    // TODO: Verificar se a empresa existe

    return await this.surveyRepository.create({
      title,
      company,
      answers: [],
      app: false,
      email: false,
      sms: false,
      whatsapp: false,
      status: SurveyStatusEnum.SCHEDULED,
      scheduledDate,
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.surveyRepository.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
  }
}
