import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TopicResponse {
  @ApiProperty({
    description: 'Topic id',
    type: String,
  })
  @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    description: 'Topic name',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Topic description',
    type: String,
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Topic survey',
    type: String,
  })
  @Expose()
  survey: string;

  @ApiProperty({
    description: 'Topic creation date',
    type: Date,
  })
  @Transform(({ obj }) => obj.created_at, { toClassOnly: true })
  @Expose({ name: 'createdAt' })
  created_at: Date;
}
