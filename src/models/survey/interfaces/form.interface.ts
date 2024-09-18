import { FormTypes } from '../enums/types.enum';

export interface IForm {
  surveytype: FormTypes;
  description: string;
  responses: (string | number)[];
}