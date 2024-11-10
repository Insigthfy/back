import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICompany } from '../interfaces/company.interface';

@Schema()
export class Company implements ICompany {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  token: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
