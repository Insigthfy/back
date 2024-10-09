import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateCostumerDto {
    @ApiProperty({
        description: "Costumer email",
        type: String
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Costumer name",
        type: String
    })
    @IsString()
    @IsDefined()
    name: string;
    
    @ApiProperty({
        description: "Costumer surname",
        type: String
    })
    @IsString()
    @IsDefined()
    surname: string;
    
    @ApiProperty({
        description: "Costumer phone number",
        type: String
    })
    @IsString()
    @IsDefined()
    phone: string;
}