import { IsEmail, IsMongoId } from "class-validator";

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
    company: string;
}