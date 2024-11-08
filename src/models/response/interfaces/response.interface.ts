import { Expose } from "class-transformer";
import { ICostumer } from "src/models/costumers/interfaces/costumer.interface";

export interface IResponse {
  topic: string;
  survey: string;
  user: ICostumer;
  email: string;
  phone: string;
  survey_answers: ISurveyAnswer[];
}

export class ISurveyAnswer {
  @Expose()
  type: string;
  
  @Expose()
  answer: string;
}