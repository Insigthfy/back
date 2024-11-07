import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResponsesService } from './../response/responses.service';
import { FormTypes } from '../survey/enums/types.enum';
dotenv.config();

@Injectable()
export class GeminiAIService {
  constructor(private readonly responseService: ResponsesService) {}

  async summarizeText(idSurvey: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const responses = await this.responseService.getSurveyById(idSurvey);

      if (!responses.length)
        throw new NotFoundException('Pesquisa não encontrada!');

      const textAnswer: string[][] = responses.map((e) =>
        e.survey_answers
          .filter((e) => e.type === FormTypes.TEXT.toString())
          .map((e) => e.answer),
      );

      const analyze: string = textAnswer.join(' ');

      if (analyze.trim().length === 0) {
        throw new NotFoundException('Nenhum comentário encontrado');
      }

      const emotion = await this.emotionText(idSurvey);

      const result = await model.generateContent(
        `Can you sumarize it to me in pt-br, clustering it on different categories and no introduction (just the summarize)? Do not suggest any action to remove or add new comments. You should return it as a json mapped as {summary: allTheTextsJoinedSummarized, topics: [topicName: [textsOfTopic]]}, also add on this json the positive and negative topics length based on ${emotion}. return it as json. texts: ${analyze}`,
      );
      const response = result.response;
      const textR = JSON.parse(
        response.text().replace('```json', '').replace('```', ''),
      );

      return textR;
    } catch (error) {
      throw error;
    }
  }

  async emotionText(idSurvey: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const responses = await this.responseService.getSurveyById(idSurvey);

      if (!responses) throw new NotFoundException('Pesquisa não encontrada!');

      const textAnswer: string[][] = responses.map((e) =>
        e.survey_answers
          .filter((e) => e.type === FormTypes.TEXT.toString())
          .map((e) => e.answer),
      );

      const analyze: string = textAnswer.join(' ');

      if (analyze.trim().length === 0) {
        throw new NotFoundException('Nenhum comentário encontrado');
      }

      const result = await model.generateContent(
        "Can you cluster it on different categories/occurrences, and then classify then based on what kinda of emotion they pass (be direct, and give your summarized reason of choice) response on pt-br. Just analysis the relevant ones (the ones there are not too much negative or positive), if one of them are not relevant and significant discard it analysis. Don't forget to cluster it at max. For the answer i need the number of comments each category, the emotions of the category and the number of discarded comments and ONE (1) example of it? Do not suggest any action to remove or add new comments. text: " +
          analyze,
      );
      const response = result.response;
      const textR = response.text();

      return textR;
    } catch (error) {
      throw error;
    }
  }

  async classificationPromotorOrNot(idSurvey: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const responses = await this.responseService.getSurveyById(idSurvey);

    if (!responses) throw new NotFoundException('Pesquisa não encontrada!');

    const textAnswer: string[][] = responses.map((e) =>
      e.survey_answers.map((e) => e.answer),
    );

    const analyze: string = textAnswer.join(' ');

    if (analyze.trim().length === 0) {
      throw new NotFoundException('Nenhum comentário encontrado');
    }

    const result = await model.generateContent(
      "You must classify all the comments as 'Promotor', 'Neutro' or 'Detrator' based on the comment written, return just a list with the classification. Give me just an array with the final result. texts: " +
        analyze,
    );
    const response = result.response;
    const textR = response.text();

    return textR;
  }
}
