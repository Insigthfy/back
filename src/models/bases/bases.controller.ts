import { Body, Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParamsDto } from '../companies/dto/params.dto';
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/entity.dto';
import { ResponseDTOInterceptor } from 'src/common/interceptors/response.interceptor';
import { BaseResponse } from './dto/output.dto';

@ApiTags("Bases")
@ApiBearerAuth()
@Controller('v1/bases')
@UseInterceptors(new ResponseDTOInterceptor(BaseResponse))
export class BasesController {
    constructor(
        private readonly basesService: BasesService,
    ) {}   
    
    @Get()
    find() {
        return this.basesService.find();
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({
        name: "id",
        type: String,
        required: true
    })
    async uploadCsv(
        @UploadedFile() file: Express.Multer.File,
        @Body() base: CreateBaseDto
    ) {
        if (!file) {
            throw new NotFoundException("File is required");
        }

        const csvData = await this.basesService.create(file.buffer, base);

        return csvData;
    }
}
