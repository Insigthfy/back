import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { EmailBodyDTO } from './dto/emailBody.dto';

@Injectable()
export class IntegrationsService {
  constructor() {}

  async getModalIntegration(): Promise<string> {
    return path.join(
      __dirname,
      '../../../public/modalIntegrationTemplate.html',
    );
  }

  async renderTemplate(emailData: EmailBodyDTO): Promise<string> {
    const templatePath = path.join(
      __dirname,
      '../../../public/avaliationTemplate.html',
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const templateReplaced = template
      .replace('{{title}}', emailData.title)
      .replace('{{description}}', emailData.description)
      .replace('{{companyName}}', emailData.companyName);
    return templateReplaced;
  }
}
