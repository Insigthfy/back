import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CompanyResponse } from "src/models/companies/dto/output.dto";

export class ConstumerResponse {
    @ApiProperty({
        description: "Costumer id",
        type: String
    })
    @Expose()
    id: string;
    
    @ApiProperty({
        description: "Costumer company",
        type: CompanyResponse
    })
    @Expose()
    company: CompanyResponse;
    
    @ApiProperty({
        description: "Costumer email",
        type: String
    })
    @Expose()
    email: string;
}