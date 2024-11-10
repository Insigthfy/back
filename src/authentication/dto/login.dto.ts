import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ILogin } from '../interfaces/login.interface';
import { ApiProperty } from '@nestjs/swagger';
import { UserExists } from 'src/common/validators/user-validator';

export class SignInDto implements ILogin {
  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsEmail()
  @UserExists()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({
    description: 'User name',
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @UserExists()
  name: string;

  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsEmail()
  @UserExists()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User company',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  company: string;
}
