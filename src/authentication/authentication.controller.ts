import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto/login.dto';
import { AuthResponse } from './dto/output.dto';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { IsPublic } from 'src/common/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('authentication')
@UseInterceptors(new ResponseDTOInterceptor(AuthResponse))
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    status: 200,
    description: 'Sucessfully authenticated',
  })
  @ApiResponse({
    status: 404,
    description: 'User with that username not found.',
  })
  @ApiResponse({
    status: 401,
    description: 'Your request was not authorized. Your password is wrong.',
  })
  @HttpCode(200)
  @Post('/login')
  @IsPublic()
  async signIn(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn({ email, password });
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @HttpCode(201)
  @Post('/signup')
  @IsPublic()
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}
