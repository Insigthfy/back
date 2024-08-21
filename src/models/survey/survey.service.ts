import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { Repository } from "typeorm";
import { CreateSurveyDto } from "./dto/entity.dto";

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>
    ) {}

    async getById(id: string): Promise<Survey> {
        return await this.surveyRepository.findOneByOrFail({ id });
    }

    async create(survey: CreateSurveyDto): Promise<Survey> {
        const newSurvey = new Survey();
        newSurvey.title = survey.title;
        newSurvey.company = survey.company;
        newSurvey.questions = survey.questions;        
        newSurvey.createdAt = new Date();
        newSurvey.updatedAt = new Date();
        return await this.surveyRepository.save(newSurvey);
    }
    
    async delete(id: string): Promise<void> {
        await this.surveyRepository.delete({ id });
    }
}