import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as sgMail from '@sendgrid/mail';
import { Template } from '../integrations/entities/template.entity';
import { Model } from 'mongoose';
import { SurveysService } from '../survey/surveys.service';
import { CompaniesService } from '../companies/companies.service';
import { CostumersService } from '../costumers/costumers.service';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateRepository: Model<Template>,
    private readonly surveyService: SurveysService,
    private readonly companyService: CompaniesService,
    private readonly costumerService: CostumersService,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
    survey: string,
    company: string,
  ): Promise<void> {
    const dataHTML = await this.templateRepository.findById(
      '6728d5f034a120043a1d80bb',
    );
    const userId = await this.costumerService.findByEmail(to);

    const newHTML = dataHTML.content.replaceAll('{{nomeEmpresa}}', company);
    const finalHTML = newHTML.replaceAll(
      '{{linkPesquisa}}',
      `https://insightfy.vercel.app/pesquisa/${survey}/${userId.id}`,
    );

    const msg = {
      to: to,
      from: process.env.MAIL_FROM,
      subject: subject,
      text: content,
      html: `${finalHTML}`,
    };

    console.log(process.env.SENDGRID_API_KEY);

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
      const sData = await this.surveyService.getById(survey);
      const sCompany = await this.companyService.findOne(sData.company);

      try {
        await this.sendEmail(email, subject, content, survey, sCompany.name);
        console.log(`Email sent to ${email}`);
      } catch (error) {
        console.error(
          `Failed to send email to ${email}:`,
          error?.response?.body?.errors,
        );
      }
    }
  }
}
