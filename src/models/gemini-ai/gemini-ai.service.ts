import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResponsesService } from './../response/responses.service';
dotenv.config();

@Injectable()
export class GeminiAIService {
  constructor(private readonly responseService: ResponsesService) {}

  async summarizeText(idSurvey: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const responses = await this.responseService.getById(idSurvey);

      if (!responses) throw new NotFoundException('Pesquisa não encontrada!');

      const analyze: string = responses.responses
        .map((e) => e[2].map((a: any) => a['text'] ?? ''))
        .join(' ');

      if (analyze.trim().length === 0) {
        throw new NotFoundException('Nenhum comentário encontrado');
      }

      const result = await model.generateContent(
        'Can you sumarize it to me in pt-br, clustering it on different categories and no introduction (just the summarize)? ' +
          analyze,
      );
      const response = result.response;
      const textR = response.text();

      return textR;
    } catch (error) {
      throw error;
    }
  }

  async emotionText(idSurvey: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const responses = await this.responseService.getById(idSurvey);

      if (!responses) throw new NotFoundException('Pesquisa não encontrada!');

      const analyze: string = responses.responses
        .map((e) => e[2].map((a: any) => a['text'] ?? ''))
        .join(' ');

      if (analyze.trim().length === 0) {
        throw new NotFoundException('Nenhum comentário encontrado');
      }

      const result = await model.generateContent(
        "Can you cluster it on different categories/occurrences, and then classify then based on what kinda of emotion they pass (be direct, and give your summarized reason of choice) response on pt-br. Just analysis the relevant ones (the ones there are not too much negative or positive), if one of them are not relevant and significant discard it analysis. Don't forget to cluster it at max. For the answer i need the number of comments each category, the emotions of the category and the number of discarded comments and ONE (1) example of it? " +
          analyze,
      );
      const response = result.response;
      const textR = response.text();

      return textR;
    } catch (error) {
      throw error;
    }
  }
}
