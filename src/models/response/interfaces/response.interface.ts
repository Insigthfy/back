export interface IResponse {
  topic: string;
  survey: string;
  user: string;
  email: string;
  phone: string;
  survey_answers: {
    type: string;
    answer: string;
  }[];
}
