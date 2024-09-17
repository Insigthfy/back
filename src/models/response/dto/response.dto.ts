import { Response } from "../entities/response.entity";

export class ResponseDto {
  readonly quantity: number;
  readonly responses: Response[];
}