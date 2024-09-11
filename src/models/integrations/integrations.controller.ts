import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Response } from 'express';
import { promisify } from 'util';
import * as fs from 'fs';
import { EmailBodyDTO } from './dto/emailBody.dto';

@Controller('integrations')
export class IntegrationsController {
  private readFileAsync = promisify(fs.readFile);

  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/modal')
  async getModalIntegration(@Res() res: Response): Promise<Response<string>> {
    try {
      const filePath = await this.integrationsService.getModalIntegration();

      const data = await this.readFileAsync(filePath, 'utf-8');

      res.setHeader('Content-Type', 'text/html');

      return res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Post('/sendEmail')
  async sendEmail(
    @Res() res: Response,
    @Body() emailBody: EmailBodyDTO,
  ): Promise<Response<string>> {
    try {
      const filePath = await this.integrationsService.renderTemplate(emailBody);

      const data = await this.readFileAsync(filePath, 'utf-8');

      res.setHeader('Content-Type', 'text/html');

      return res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
