import { IUser } from "../interfaces/user.interface";
import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User implements IUser {
    name: string;
    email: string;
    company: string;
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);