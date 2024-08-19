import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class IntegrationsService {
  constructor() {}

  async getModalIntegration(): Promise<string> {
    return path.join(
      __dirname,
      '../../../public/modalIntegrationTemplate.html',
    );
  }
}
