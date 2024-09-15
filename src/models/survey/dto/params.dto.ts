import { IsDefined, IsString } from "class-validator";

export class SurveyParamsDto {
  @IsDefined()
  @IsString()
  id: string;
}
