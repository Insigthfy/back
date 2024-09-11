import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

@Injectable()
export class GeminiAIService {
  constructor() {}

  async summarizeText(idSurvey: number): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const comments = {};

      const result = await model.generateContent(
        'Can you sumarize it to me in pt-br, clustering it on different categories and no introduction (just the summarize)? ' +
          comments,
      );
      const response = result.response;
      const textR = response.text();

      return textR;
    } catch (error) {
      throw error;
    }
  }

  async emotionText(idSurvey: number): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const comments = {};

      const result = await model.generateContent(
        'Can you cluster it on different categories/occurrences, and then classify then based on what kinda of emotion they pass (be direct, and give your summarized reason of choice) response on pt-br. Just analysis the relevant ones (the ones there are not too much negative or positive), if one of them are not relevant and significant discard it analysis. Dont forget to cluster it at max. For the answer i need the number of comments each category, the emotions of the category and the number of discarded comments and ONE (1) example of it? ' +
          comments,
      );
      const response = result.response;
      const textR = response.text();

      return textR;
    } catch (error) {
      console.error('Gemini AI API Error:', error.response?.data);
      throw error;
    }
  }
}
