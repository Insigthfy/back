import { Injectable, NotFoundException } from "@nestjs/common";
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dto/entity.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SurveyStatusEnum } from "./enums/survey-status.enum";
import { CompaniesService } from "../companies/companies.service";

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey>,
    private readonly companiesService: CompaniesService,
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

  async findRecents(): Promise<Survey[]> {
    return this.surveyRepository.find().limit(6);
  }

  async create({ company, title, scheduledDate }: CreateSurveyDto) {
    const c = await this.companiesService.findOne(company);

    if(!c) {
      throw new NotFoundException(`Cannot find company with id ${company}`);
    }

    return await this.surveyRepository.create({
      title,
      company,
      form: [],
      app: false,
      email: false,
      sms: false,
      whatsapp: false,
      status: SurveyStatusEnum.SCHEDULED,
      date_scheduled: scheduledDate
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.surveyRepository.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
  }
}
