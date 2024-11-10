import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class SurveyParamsDto {
  @Type(() => Types.ObjectId)
  id: string;
}
