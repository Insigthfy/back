import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class CompanyResponse {
    @ApiProperty({
        description: "Topic id",
        type: String
    })
    @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
    @Expose({ name: "id" })
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