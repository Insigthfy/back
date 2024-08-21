import { IsDefined } from "class-validator";

export class SurveyParamsDto {
    @IsDefined()
    id: string;
}