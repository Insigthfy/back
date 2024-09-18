import { Type } from "class-transformer";
import { IsEmail, IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class ParamsDto {
    @IsMongoId()
    id: string;
}

export class EmailParamDto {
    @IsEmail()
    email: string;
}

export class CompanyParamsDto {
    @IsMongoId()
    @Type(() => Types.ObjectId)
    company: string;
}