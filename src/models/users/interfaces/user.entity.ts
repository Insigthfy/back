import { Schema } from "@nestjs/mongoose";
import { IUser } from "../entities/user.entity";

@Schema({})
export class User implements IUser {
    id: string;
    company: string;
    email: string;
    password: string;
    
}