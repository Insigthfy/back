import { Injectable, NotFoundException } from "@nestjs/common";
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Response } from "../response/entities/response.entity";
import { v4 } from "uuid";
import { ResponseDto } from "../response/dto/response.dto";

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey>,
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
  ) {}

  async getById(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ id }).select('-_id');
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    return survey;
  }

  async getResponses(id: string): Promise<ResponseDto> {
    const responses = await this.responseRepository.find({ 'id': id }).select('-_id');
    const quantity = responses.length;
    if (responses.length === 0) {
      throw new NotFoundException(`Responses for survey with id ${id} not found`);
    }
    return { quantity, responses };
  }

  async create(survey: CreateSurveyDto): Promise<Survey> {
    const newSurvey = new Survey();
    const newResponse = new Response();
    newResponse.id = v4();
    newResponse.responses = null;
    newSurvey.id = v4();
    newSurvey.title = survey.title;
    newSurvey.company = survey.company;
    newSurvey.questions = survey.questions;
    newSurvey.createdAt = new Date();
    newSurvey.updatedAt = new Date();
    await this.responseRepository.create(newResponse);
    return await this.surveyRepository.create(newSurvey);
  }

  async delete(id: string): Promise<void> {
    const result = await this.surveyRepository.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    await this.responseRepository.deleteOne({ id });
  }
}
