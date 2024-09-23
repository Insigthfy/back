import { Response } from "../entities/response.entity";

export class ResponseDtoOutput {
  readonly quantity: number;
  readonly responses: Response[];
}