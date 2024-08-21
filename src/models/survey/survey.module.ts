import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { SurveysService } from "./survey.service";
import { SurveysController } from "./survey.controller";

@Module({
    imports: [ TypeOrmModule.forFeature([ Survey ]) ],
    providers: [ SurveysService ],
    controllers: [ SurveysController ],
    exports: [ SurveysService ]
})
export class SurveyModule {}