import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResponse, ISurveyAnswer } from '../interfaces/response.interface';
import { Types } from 'mongoose';
import { ICostumer } from 'src/models/costumers/interfaces/costumer.interface';

@Schema()
export class Response implements IResponse {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  survey: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "Costumer" })
  user: ICostumer;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    required: true,
  })
  survey_answers: ISurveyAnswer[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
