import { Injectable, NotFoundException } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { CreateQuestionDto, CreateSurveyDto } from './dto/entity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyStatusEnum } from './enums/survey-status.enum';
import { CompaniesService } from '../companies/companies.service';
import { FormTypes } from './enums/types.enum';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyRepository: Model<Survey & Document>,
    private readonly companiesService: CompaniesService,
  ) {}

  async find(): Promise<Survey[]> {
    const data = await this.surveyRepository.find().lean();

    return data;
  }

  async getById(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.findById(id).lean();

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    return survey;
  }

  async findRecents(): Promise<Survey[]> {
    const data = await this.surveyRepository.find().limit(6);

    return data;
  }

  async create({ company, title, scheduledDate }: CreateSurveyDto) {
    const c = await this.companiesService.findOne(company);

    if (!c) {
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
      base: null,
      status: SurveyStatusEnum.SCHEDULED,
      date_scheduled: scheduledDate,
    });
  }

  async createQuestion(id: string, { surveyType }: CreateQuestionDto) {
    const survey = await this.getById(id);

    survey.form.push({
      surveyType,
      description: 'This is a default description',
      responses: this.createResponse(surveyType),
    });

    await survey.save();

    return survey;
  }

  async patch(id: string, obj: Partial<Survey>) {
    const updatedSurvey = await this.surveyRepository.findByIdAndUpdate(
      id,
      obj,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedSurvey) {
      throw new Error('Survey not found');
    }

    return updatedSurvey;
  }

  async delete(id: string): Promise<void> {
    const result = await this.surveyRepository.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
  }

  private createResponse(surveyType: FormTypes) {
    switch (surveyType) {
      case FormTypes.GRADE:
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      case FormTypes.TEXT_BOXES:
        return ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Muito Bom'];
      default:
        return '';
    }
  }
}
