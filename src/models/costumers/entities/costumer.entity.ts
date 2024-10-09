import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICostumer } from "../interfaces/costumer.interface";
import { Types } from "mongoose";

@Schema()
export class Costumer implements ICostumer {
    @Prop()
    name: string;
    
    @Prop()
    surname: string;
    
    @Prop()
    email: string;
    
    @Prop()
    phone: string;
}

export const CostumerSchema = SchemaFactory.createForClass(Costumer);