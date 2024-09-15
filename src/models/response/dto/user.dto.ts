import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  phone: string;
}