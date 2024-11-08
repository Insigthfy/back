import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResponsesService } from './../response/responses.service';
import { FormTypes } from '../survey/enums/types.enum';
dotenv.config();

@Injectable()
export class GeminiAIService {
  constructor(private readonly responseService: ResponsesService) { }

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
        `Summarize the following texts in pt-br and return a JSON: {"summary": "Uma única string resumindo todos os textos.", "topics": [{"topicTitle": "Título do tópico", "topicDescription": "Descrição geral do tema, sem mencionar nomes ou detalhes específicos.", "texts": ["Lista de textos relacionados a esse tópico"]}], "positiveTopicsCount": Número de tópicos positivos (${emotion}), "negativeTopicsCount": Número de tópicos negativos (${emotion})}; evite mencionar nomes específicos ou títulos presentes nos textos originais; forneça apenas o JSON, sem introduções ou sugestões; textos: ${analyze}.`
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
      `Classify each comment provided below on a scale from 0 to 10, where:
      - '0' is **very harsh** or **very critical** with strong negative emotions.
      - '1-3' is **mildly negative**, such as sarcasm or subtle criticism.
      - '4-6' is **neutral**, with mild opinions and observations.
      - '7-9' is **positive**, with approval or mild enthusiasm.
      - '10' is **very positive**, with strong praise.
    
      Important rules:
      - **Grade each comment as a whole without breaking it into parts**.
      - **Do not interpret or mix different sentiments within a single comment**—grade based on the overall tone.
      - Ignore any empty comments or arrays in the input.
      
      Provide only the grades in the following format: ['Ruim', 'Positivo', 'Positivo'].
      The values are:
      - '0': 'Muito negativo'.
      - '1-3': 'Negativo'.
      - '4-6': 'Neutro'.
      - '7-9': 'Positivo'.
      - '10': 'Muito positivo'.
      
      Comments to classify:
      ${JSON.stringify(analyze)}
    `
    );
    const response = result.response;
    const textR = response.text();

    return textR;
  }
}
