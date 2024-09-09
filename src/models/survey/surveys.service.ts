import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { Repository } from 'typeorm';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey>,
  ) {}

  async getById(id: string): Promise<Survey> {
    return this.surveyRepository.findOne({ 'id': id });
  }

  async create(survey: CreateSurveyDto): Promise<Survey> {
    const newSurvey = new Survey();
    newSurvey.title = survey.title;
    newSurvey.company = survey.company;
    newSurvey.questions = survey.questions;
    newSurvey.createdAt = new Date();
    newSurvey.updatedAt = new Date();
    return await this.surveyRepository.create(newSurvey);
  }

  async delete(id: string): Promise<void> {
    await this.surveyRepository.deleteOne({ 'id': id });
  }
}
