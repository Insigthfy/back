import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { IBase } from "../interfaces/base.interface";

@Schema()
export class Base implements IBase {
    @Prop()
    name: string;
}

export const BaseSchema = SchemaFactory.createForClass(Base);