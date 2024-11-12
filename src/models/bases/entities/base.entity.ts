import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBase } from '../interfaces/base.interface';

@Schema()
export class Base implements IBase {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  company: string;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
