import { Injectable, NotFoundException } from '@nestjs/common';
import { SurveysService } from '../survey/surveys.service';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from './entities/template.entity';
import { Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateRepository: Model<Template>,
    private readonly surveysService: SurveysService,
    private readonly companiesService: CompaniesService,
  ) { }

  async find(id: string): Promise<string> {
    const template = await this.templateRepository.findOne();

    if (!template) {
      throw new NotFoundException("Cannot find this template");
    }

    const survey = await this.surveysService.getById(id);

    if (!survey) {
      throw new NotFoundException(`Cannot find the survey with id ${id}`);
    }

    const company = await this.companiesService.findOne(survey.company);

    if (!company) {
      throw new NotFoundException(`Cannot find the company with id ${id}`);
    }

    let data = template.content;

    data = data
      .replaceAll("{surveyTitle}", survey.title)
      .replaceAll("{businessName}", company.name);

    return data;
  }
}
