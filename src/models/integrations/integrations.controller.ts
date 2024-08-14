import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Response } from 'express';
import { promisify } from 'util';
import * as fs from 'fs';

@Controller('integrations')
export class IntegrationsController {
  private readFileAsync = promisify(fs.readFile);

  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('/modal')
  async getModalIntegration(@Res() res: Response): Promise<void> {
    try {
      const filePath = await this.integrationsService.getModalIntegration();

      const data = await this.readFileAsync(filePath, 'utf-8');

      res.setHeader('Content-Type', 'text/html');

      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
