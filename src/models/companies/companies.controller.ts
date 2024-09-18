import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { ParamsDto } from './dto/params.dto';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('Companies')
@Controller('v1/companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @ApiParam({ name: 'id', type: String })
    @Get("/:id")
    findOne(@Param() { id }: ParamsDto) {
        return this.companiesService.findOne(id);
    }

    @ApiBody({
        type: CreateCompanyDto,
        required: true
    })
    @Post()
    create(@Body() company: CreateCompanyDto) {
        return this.companiesService.create(company);
    }

    @ApiParam({ name: 'id', type: String })
    @ApiBody({
        type: CreateCompanyDto,
        required: true
    })
    @Patch("/:id")
    update(
        @Param() { id }: ParamsDto,
        @Body() company: Partial<CreateCompanyDto>
    ) {
        return this.companiesService.update(id, company);
    }

    @ApiParam({ name: 'id', type: String })
    @Delete("/:id")
    deleteOne(@Param() { id }: ParamsDto) {
        return this.companiesService.deleteOne(id);
    }
}
