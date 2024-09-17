import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Group {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  surveys: string[];
}