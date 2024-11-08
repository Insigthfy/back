import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsMongoId, IsString } from "class-validator";
import { FormTypes } from '../enums/types.enum';

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
  @IsMongoId()
  company: string;

  @ApiProperty({
    description: 'Date for the survey',
    type: Date,
  })
  @IsDefined()
  @IsDateString()
  scheduledDate: Date;
}

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Type of survey question',
    enum: () => FormTypes,
  })
  @IsDefined()
  @IsString()
  surveyType: FormTypes;
}