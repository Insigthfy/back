import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { IQuestions } from '../interfaces/question.interface';

export class CreateSurveyDto {
  @ApiProperty({
    description: 'Title of the survey',
    type: String,
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Company that the survey is for',
    type: String,
  })
  @IsDefined()
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Questions for the survey',
    type: Object,
  })
  @IsDefined()
  questions: IQuestions[];
}
