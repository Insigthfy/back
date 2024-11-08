import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ISurveyAnswer } from '../interfaces/response.interface';
import { CostumerResponse } from "../../costumers/dto/output.dto";

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
  @Type(() => CostumerResponse)
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
  @Type(() => ISurveyAnswer)
  @Transform(({ obj }) => obj.survey_answers, { toClassOnly: true })
  @Expose({ name: "surveyAnswers" })
  survey_answers: ISurveyAnswer[];
}
