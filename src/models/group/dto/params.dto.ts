import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class GroupParamsDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;
}