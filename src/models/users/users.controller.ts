import { Body, Controller, Get, Param, Patch, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { UsersResponse } from './dto/output.dto';
import { EmailParamDto, ParamsDto } from './dto/params.dto';
import { ChangePasswordDto } from './dto/entity.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(new ResponseDTOInterceptor(UsersResponse))
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @ApiResponse({
        status: 200,
        type: [UsersResponse]
    })
    @Get()
    find() {
        return this.usersService.find();
    }

    @ApiResponse({
        status: 200,
        type: UsersResponse
    })
    @Get('me')
    findUser(@Req() req) {
        return this.usersService.findOne(req.id);
    }

    @ApiResponse({
        status: 200,
        type: UsersResponse
    })
    @ApiParam({
        name: "id",
        type: String
    })
    @Get(':id')
    findOne(@Param() { id }: ParamsDto) {
        return this.usersService.findOne(id);
    }

    @ApiResponse({
        status: 200,
        type: UsersResponse
    })
    @ApiParam({
        name: "email",
        type: String
    })
    @Get('email/:email')
    findByEmail(@Param() { email }: EmailParamDto) {
        return this.usersService.findByEmail(email);
    }

    @ApiResponse({
        status: 204,
    })
    @ApiParam({
        name: "id",
        type: String
    })
    @Patch(':id')
    changePassword(
        @Body() { password }: ChangePasswordDto,
        @Param() { id }: ParamsDto
    ) {
        return this.usersService.changePassword(id, password);
    }
}
