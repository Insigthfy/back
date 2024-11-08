import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBaseDto {
    @Prop()
    @ApiProperty()
    name: string;
}