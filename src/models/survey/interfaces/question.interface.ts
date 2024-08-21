import { QuestionTypes } from "../enums/types.enum";

export interface IQuestions {
    type: QuestionTypes;
    question: string;
    required: boolean;
}

export interface GradeQuestion extends IQuestions {
    type: QuestionTypes.GRADE;
    grade: number;
}

export interface TextBoxQuestion extends IQuestions {
    type: QuestionTypes.TEXT_BOXES | QuestionTypes.ORDERED_TEXT_BOXES;
    textBoxes: string[];
}

export interface SimpleTestQuestion extends IQuestions {
    type: QuestionTypes.TEXT;
    testAnswer: string;
}
