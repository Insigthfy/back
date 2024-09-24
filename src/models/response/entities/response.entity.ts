import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
    type: String || Number,
    required: true
  })
  answer: string | number;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);