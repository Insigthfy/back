import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    type: String,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  phone: string;
}