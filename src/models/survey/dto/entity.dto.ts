import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsMongoId, IsString } from "class-validator";

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
