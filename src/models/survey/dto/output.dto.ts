import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { IForm } from '../interfaces/form.interface';

export class FormResponse {
  @ApiProperty({
    description: "Form description",
    type: String
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: "Possible responses to the form",
    type: [String, Number],
  })
  @Expose()
  responses: string[] | number[];

  @ApiProperty({
    description: "Type of the form (1 for rating, 2 for selection, etc.)",
    type: String,
  })
  @Expose()
  surveyType: string;
}

export class SurveyResponse {
  @ApiProperty({
    description: "Survey id",
    type: String
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Title of the survey',
    type: String,
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: "Survey app trigger method",
    type: Boolean,
  })
  @Expose()
  app: boolean;

  @ApiProperty({
    description: "Survey email trigger method",
    type: Boolean,
  })
  @Expose()
  email: boolean;

  @ApiProperty({
    description: "Survey sms trigger method",
    type: Boolean,
  })
  @Expose()
  sms: boolean;

  @ApiProperty({
    description: "Survey whatsapp trigger method",
    type: Boolean,
  })
  @Expose()
  whatsapp: boolean;

  @ApiProperty({
    description: "Survey status",
    enum: () => SurveyStatusEnum,
  })
  @Expose()
  status: SurveyStatusEnum;  

  @ApiProperty({
    description: "Survey company",
    type: String,
  })
  @Expose()
  company: string;  

  @ApiProperty({
    description: "Survey status",
    type: [FormResponse],
  })
  @Expose()
  @Type(() => FormResponse) 
  form: FormResponse[];  

  @ApiProperty({
    description: "Date of the survey",
    type: Date,
  })
  @Expose()
  scheduledDate: Date;
}