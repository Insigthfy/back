import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ConstumerResponse {
        @ApiProperty({
        description: "Costumer email",
        type: String
    })
    @Expose()
    email: string;

    @ApiProperty({
        description: "Costumer name",
        type: String
    })
    @Expose()
    name: string;
    
    @ApiProperty({
        description: "Costumer surname",
        type: String
    })
    @Expose()
    surname: string;
    
    @ApiProperty({
        description: "Costumer phone number",
        type: String
    })
    @Expose()
    phone: string;
}