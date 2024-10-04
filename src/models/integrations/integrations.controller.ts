import { Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Response } from 'express';
import { ParamsDto } from './dto/params.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/modal/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async getModalIntegration(
    @Param() { id }: ParamsDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const data = await this.integrationsService.find(id);

      res.setHeader('Content-Type', 'text/html');

      return res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  // @Post('/sendEmail')
  // async sendEmail(
  //   @Res() res: Response,
  //   @Body() emailBody: EmailBodyDTO,
  // ): Promise<Response<string>> {
  //   try {
  //     const filePath = await this.integrationsService.renderTemplate(emailBody);

  //     // const data = await this.readFileAsync(filePath, 'utf-8');

  //     res.setHeader('Content-Type', 'text/html');

  //     return res.status(HttpStatus.OK).send(data);
  //   } catch (err) {
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  //   }
  // }
}
