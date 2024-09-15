import { IsDefined, IsString } from "class-validator";

export class ResponseParamsDto {
  @IsDefined()
  @IsString()
  id: string;
}
