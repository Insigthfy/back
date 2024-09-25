import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsMongoId, IsString } from "class-validator";

export class CreateTopicDto {
    @ApiProperty({
        description: "Topic name",
        type: String
    })
    @IsString()
    @IsDefined()
    name: string;

    @ApiProperty({
        description: "Topic description",
        type: String
    })
    @IsString()
    @IsDefined()
    description: string;

    @ApiProperty({
        description: "Topic survey",
        type: String
    })
    @IsMongoId()
    @IsDefined()
    survey: string;

    @ApiProperty({
        description: "Topic creation date",
        type: Date
    })
    @IsDateString()
    @IsDefined()
    created_at: Date;
}