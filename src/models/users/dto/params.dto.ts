import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class EmailParamDto {
    @IsEmail()
    email: string;
}

export class ParamsDto {
    @IsMongoId()
    @IsDefined()
    @Type(() => Types.ObjectId)
    id: string;
}