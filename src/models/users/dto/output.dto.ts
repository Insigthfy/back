import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { CompanyResponse } from "src/models/companies/dto/output.dto";

export class UsersResponse {
    @ApiProperty({
        description: "User id",
        type: String
    })
    @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
    @Expose({ name: "id" })
    id: string;
    
    @ApiProperty({
        description: "User name",
        type: String
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: "User email",
        type: String
    })
    @Expose()
    email: string;

    @ApiProperty({
        description: "User company",
        type: String
    })
    @Type(() => CompanyResponse)
    @Expose()
    company: string;
}