import { Controller, Delete, HttpCode, Param, Post } from "@nestjs/common";
import { SurveysService } from "./survey.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Survey } from "./entities/survey.entity";
import { CreateSurveyDto } from "./dto/entity.dto";
import { SurveyParamsDto } from "./dto/params.dto";

@Controller("surveys")
export class SurveysController {
    constructor(
        private readonly surveysService: SurveysService
    ) {}

    @ApiResponse({
        status: 200,
        type: Survey
    })
    async getById(id: string): Promise<Survey> {
        return await this.surveysService.getById(id);
    }

    @ApiResponse({
        status: 201,
        type: Survey
    })
    @HttpCode(2001)
    @ApiBody({ type: CreateSurveyDto })
    @Post()
    async create(survey: CreateSurveyDto): Promise<Survey> {
        return await this.surveysService.create(survey);
    }
    
    @ApiResponse({
	    status: 204,
        description: "Survey deleted"
    })
    @Delete(":id")
    async delete(@Param() { id }: SurveyParamsDto): Promise<void> {
        return await this.surveysService.delete(id);
    }

}