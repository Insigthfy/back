import { IsDefined, IsString } from "class-validator";

export class GroupParamsDto {
  @IsDefined()
  @IsString()
  id: string;
}