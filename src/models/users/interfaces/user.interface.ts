import { ICompany } from "src/models/companies/interfaces/company.interface";

export interface IUser {
    name: string;
    email: string;
    company: ICompany;
    password: string;
}