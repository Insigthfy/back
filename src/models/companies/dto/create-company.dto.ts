import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
    @Prop()
    @ApiProperty()
    name: string;

    @Prop()
    @ApiProperty()
    logo: string;

    @Prop()
    @ApiProperty()
    token: string;
}