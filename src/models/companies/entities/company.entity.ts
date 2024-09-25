import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICompany } from "../interfaces/company.interface";

@Schema()
export class Company implements ICompany {
    @Prop({ name: "_id" })
    id: string;

    @Prop()
    name: string;

    @Prop()
    logo: string;

    @Prop()
    token: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);