import { Type } from "class-transformer";
import { IsDefined, IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class ParamsDto {
    @IsMongoId()
    @IsDefined()
    @Type(() => Types.ObjectId)
    id: string;
}