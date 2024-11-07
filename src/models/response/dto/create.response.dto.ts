import { IsDefined, IsEmail, IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Response topic',
    type: String,
  })
  @IsMongoId()
  @IsDefined()
  topic: string;

  @ApiProperty({
    description: 'Response survey',
    type: String,
  })
  @IsMongoId()
  @IsDefined()
  survey: string;

  @ApiProperty({
    description: 'Response user name',
    type: String,
  })
  @IsString()
  @IsDefined()
  user: string;

  @ApiProperty({
    description: 'Response user email',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Response user phone',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Response answer',
    type: [Number, String, Object],
  })
  answer: number[] | number | string[] | string | object;
}
