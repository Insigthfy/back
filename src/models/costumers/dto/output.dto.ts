import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CostumerResponse {
    @ApiProperty({
        description: "Costumer id",
        type: String
    })
    @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
    @Expose({ name: "id" })
    id: string;

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

    @ApiProperty({
        description: "Costumer base",
        type: String
    })
    @Expose()
    base: string;
}