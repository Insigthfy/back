import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICostumer } from "../interfaces/costumer.interface";
import { Types } from "mongoose";

@Schema()
export class Costumer implements ICostumer {
    @Prop({ name: "_id" })
    id: string;

    @Prop({ type: Types.ObjectId, ref: 'Company' })
    company: string;

    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const CostumerSchema = SchemaFactory.createForClass(Costumer);