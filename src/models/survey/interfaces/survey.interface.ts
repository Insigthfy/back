import { SurveyStatusEnum } from '../enums/survey-status.enum';

export interface ISurvey {
  id: string;
  title: string;
  app: boolean;
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  company: string;
  status: SurveyStatusEnum;
  scheduledDate: Date;
  endDate?: Date;
  answers: any[];
}
