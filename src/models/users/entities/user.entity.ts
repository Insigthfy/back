import { Types } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICompany } from "src/models/companies/interfaces/company.interface";

@Schema()
export class User implements IUser {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ required: true, type: Types.ObjectId, ref: "Company" })
    company: ICompany;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);