import { IBase } from 'src/models/bases/interfaces/base.interface';
import { SurveyStatusEnum } from '../enums/survey-status.enum';
import { IForm } from './form.interface';

export interface ISurvey {
  title: string;
  app: boolean;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  company: string;
  base: IBase | null;
  status: SurveyStatusEnum;
  date_scheduled: Date;
  endDate?: Date;
  form: IForm[];
}
