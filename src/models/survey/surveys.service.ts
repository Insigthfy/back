import { Injectable } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Response } from "../response/entities/response.entity";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey>,
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
  ) {}

  async getById(id: string): Promise<Survey> {
    return this.surveyRepository.findOne({ 'id': id });
  }

  async getResponses(id: string): Promise<Survey[]> {
    return this.responseRepository.find({ 'id': id });
  }

  async create(survey: CreateSurveyDto): Promise<Survey> {
    const newSurvey = new Survey();
    const newResponse = new Response();
    newResponse.id = uuidv4();
    newResponse.responses = null;
    newSurvey.id = uuidv4();
    newSurvey.title = survey.title;
    newSurvey.company = survey.company;
    newSurvey.questions = survey.questions;
    newSurvey.createdAt = new Date();
    newSurvey.updatedAt = new Date();
    await this.responseRepository.create(newResponse);
    return await this.surveyRepository.create(newSurvey);
  }

  async delete(id: string): Promise<void> {
    await this.surveyRepository.deleteOne({ 'id': id });
  }
}
