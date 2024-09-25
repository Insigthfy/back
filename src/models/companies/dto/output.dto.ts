import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CompanyResponse {
    @ApiProperty({
        description: "Company id",
        type: String
    })
    @Expose()
    id: string;
    
    @ApiProperty({
        description: "Company name",
        type: String
    })
    @Expose()
    name: string;
    
    @ApiProperty({
        description: "Company logo",
        type: String
    })
    @Expose()
    logo: string;

    @ApiProperty({
        description: "Company token",
        type: String
    })
    @Expose()
    token: string;
}