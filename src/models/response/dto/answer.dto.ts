import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class answerDto {
    @ApiProperty({
        description: 'type of the question',
        type: String,
    })
    @Expose()
    type: string;

    @ApiProperty({
        description: 'answer to the question',
        type: String,
    })
    @Expose()
    answer: string;
}
