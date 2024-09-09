import { IQuestions } from './question.interface';

export interface ISurvey {
  id: string;
  title: string;
  company: string;
  questions: IQuestions[];
  createdAt: Date;
  updatedAt: Date;
}
