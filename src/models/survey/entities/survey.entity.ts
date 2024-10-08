import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISurvey } from '../interfaces/survey.interface';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { IForm } from '../interfaces/form.interface';

@Schema()
export class Survey implements ISurvey {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  app: boolean;

  @Prop({ required: true })
  email: boolean;

  @Prop({ required: true })
  sms: boolean;

  @Prop({ required: true })
  whatsapp: boolean;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  status: SurveyStatusEnum;

  @Prop({ required: true })
  date_scheduled: Date;

  @Prop({ required: true })
  form: IForm[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
