import { Injectable } from "@nestjs/common";
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(to: string, subject: string, content: string, survey: string): Promise<void> {
    const msg = {
      to: to,
      from: process.env.MAIL_FROM,
      subject: subject,
      text: content,
      html: `<p>${survey}</p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      throw error;
    }
  }

  async sendSurveyEmails(emails: string[], survey: string): Promise<void> {
    if (!emails || emails.length === 0) {
      console.warn('No email addresses provided.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const email of emails) {
      if (!email || !email.trim() || !emailRegex.test(email.trim())) {
        console.warn(`Skipping invalid email address: "${email}"`);
        continue;
      }

      const subject = 'Sua pesquisa está disponível!';
      const content = `Clique no link para responder à pesquisa`;

      try {
        await this.sendEmail(email, subject, content, survey);
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
      }
    }
  }
}