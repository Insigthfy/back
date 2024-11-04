import { IUser } from "../interfaces/user.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User implements IUser {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    company: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);