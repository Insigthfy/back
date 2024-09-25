import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNotEmpty, IsString } from "class-validator";
import { IForm } from '../interfaces/form.interface';

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
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: "Survey status",
    type: [],
  })
  form: IForm[];  

  @ApiProperty({
    description: 'Date for the survey',
    type: Date,
  })
  @IsDefined()
  @IsDateString()
  scheduledDate: Date;
}
