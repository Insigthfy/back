import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { CostumersService } from "./costumers.service";
import { CompanyParamsDto, EmailParamDto, ParamsDto } from "./dto/params.dto";
import { CreateCostumerDto } from "./dto/create-costumer.dto";
import { ResponseDTOInterceptor } from "src/common/interceptors/response.interceptor";
import { ConstumerResponse } from "./dto/output.dto";

@ApiTags('Costumers')
@UseInterceptors(new ResponseDTOInterceptor(ConstumerResponse))
@Controller('v1/costumers')
export class CostumersController {
  constructor(private readonly costumerService: CostumersService) {}

  @Get()
  find() {
    return this.costumerService.find();
  }

  @ApiParam({ name: 'id', type: String })
  @Get("/:id")
  findOne(@Param() { id }: ParamsDto) {
    return this.costumerService.findOne(id);
  }

  @ApiParam({ name: 'email', type: String })
  @Get("/email/:email")
  findByEmail(@Param() { email }: EmailParamDto) {
    return this.costumerService.findByEmail(email);
  }

  @ApiParam({ name: 'company', type: String })
  @Get("/company/:company")
  findByCompany(@Param() { company }: CompanyParamsDto) {
    return this.costumerService.findByCompany(company);
  }

  @ApiBody({
    type: CreateCostumerDto,
    required: true
  })
  @Post()
  create(@Body() costumer: CreateCostumerDto) {
    return this.costumerService.create(costumer);
  }

  @ApiParam({ name: 'id', type: String })
  @ApiBody({
    type: CreateCostumerDto,
    required: true
  })
  @Patch("/:id")
  updateOne(
    @Param() { id }: ParamsDto,
    @Body() costumer: Partial<CreateCostumerDto>
  ) {
    return this.costumerService.update(id, costumer);
  }

  @Delete("/:id")
  deleteOne(@Param() { id }: ParamsDto) {
    return this.costumerService.deleteOne(id);
  }
}
