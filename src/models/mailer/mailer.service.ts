import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, content: string, survey: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: to,
        subject: subject,
        text: content,
        html: `<p>${survey}</p>`,
      });
    } catch (error) {
      throw error;
    }
  }

  async sendSurveyEmails(emails: string[], survey: string): Promise<void> {
    for (const email of emails) {
      const subject = 'Sua pesquisa está disponível!';
      const content = `Clique no link para responder à pesquisa`;
      await this.sendEmail(email, subject, content, survey);
    }
  }
}
