import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ITemplate } from "../interfaces/template.interface";

@Schema()
export class Template implements ITemplate {
    @Prop({ name: "_id" })
    id: string;

    @Prop({ required: true })
    content: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);