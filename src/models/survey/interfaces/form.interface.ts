import { FormTypes } from '../enums/types.enum';

export interface IForm {
  surveyType: FormTypes;
  description: string;
  responses: (string | number)[] | string;
}
