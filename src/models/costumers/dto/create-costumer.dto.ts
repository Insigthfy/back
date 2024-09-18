import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateCostumerDto {
    @IsMongoId()
    @ApiProperty()
    company: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}