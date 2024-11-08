import {
  IsDefined,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISurveyAnswer } from '../interfaces/response.interface';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Response topic',
    type: String,
  })
  @IsMongoId()
  // @IsDefined()
  @IsOptional()
  topic: string;

  @ApiProperty({
    description: 'Response survey',
    type: String,
  })
  @IsMongoId()
  @IsDefined()
  survey: string;

  @ApiProperty({
    description: 'Response user name',
    type: String,
  })
  @IsString()
  @IsDefined()
  user: string;

  @ApiProperty({
    description: 'Response user email',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Response user phone',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Response answer',
  })
  survey_answers: ISurveyAnswer[];
}
