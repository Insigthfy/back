import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResponse } from '../interfaces/response.interface';

@Schema()
export class Response implements IResponse {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  survey: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    required: true,
  })
  survey_answers: {
    type: string;
    answer: string;
  }[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
