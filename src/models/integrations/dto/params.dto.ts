import { Type } from "class-transformer";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class ParamsDto {
    @IsMongoId()
    @Type(() => Types.ObjectId)
    id: string;
}