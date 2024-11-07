import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CostumerResponse {
  @ApiProperty({
    description: 'Topic id',
    type: String,
  })
  @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    description: 'Costumer company',
    type: String,
  })
  @Expose()
  company: string;

  @ApiProperty({
    description: 'Costumer email',
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Costumer phone',
    type: String,
  })
  @Expose()
  phone: string;
}
