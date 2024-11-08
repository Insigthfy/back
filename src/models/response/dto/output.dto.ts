import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { answerDto } from "./answer.dto";

export class ResponseResponse {
  @ApiProperty({
    description: 'Topic id',
    type: String,
  })
  @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    description: 'Response topic',
    type: String,
  })
  @Expose()
  topic: string;

  @ApiProperty({
    description: 'Response survey',
    type: String,
  })
  @Expose()
  survey: string;

  @ApiProperty({
    description: 'Response username',
    type: String,
  })
  @Expose()
  user: string;

  @ApiProperty({
    description: 'Response user email',
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Response user phone',
    type: String,
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'Response answer',
    type: [Object],
  })
  @Expose()
  survey_answers: answerDto[];
}
