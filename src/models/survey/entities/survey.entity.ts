import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IQuestions } from '../interfaces/question.interface';
import { ISurvey } from '../interfaces/survey.interface';

@Schema()
export class Survey implements ISurvey {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  questions: IQuestions[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
