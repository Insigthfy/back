import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class SurveyParamsDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;
}
