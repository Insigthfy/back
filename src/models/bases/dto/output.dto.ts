import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class BaseResponse {
  @ApiProperty({
    description: 'Base id',
    type: String,
  })
  @Transform(({ obj }) => obj?._id?.toString() ?? obj.id.toString(), {
    toClassOnly: false,
  })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    description: 'Base name',
    type: String,
  })
  @Expose()
  name: string;
}
