import { Schema } from "@nestjs/mongoose";
import { IQuestions } from "../interfaces/question.interface";

@Schema()
export class Survey {
    id: string;
    title: string;
    company: string;
    questions: IQuestions[];
    createdAt: Date;
    updatedAt: Date;
}