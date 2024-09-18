import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class ResponseParamsDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;
}
