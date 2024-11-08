import { IsDefined, IsString } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsDefined()
    password: string;
}