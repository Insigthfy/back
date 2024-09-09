import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IResponse } from '../interfaces/response.interface';
import { HydratedDocument } from "mongoose";

@Schema()
export class Response implements IResponse {
  @Prop()
  id: string;

  @Prop()
  responses: any[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);