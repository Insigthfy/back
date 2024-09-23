import { UserDto } from "./user.dto";
import { IsArray, IsDefined, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateResponseDto {
  @ApiProperty({
    description: 'User that submitted the survey',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'Responses to the survey questions',
    type: Array,
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  responses: any[];
}
