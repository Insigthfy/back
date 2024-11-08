import { Injectable } from "@nestjs/common";
import { GeminiAIService } from "../gemini-ai/gemini-ai.service";

Injectable()
export class ResponsePromoterService {
    constructor(private readonly geminiAIService: GeminiAIService) {}

  async calculateNpsClassification(surveyAnswers: { type: string; answer: string }[]): Promise<string> {
    let totalScore = 0;
    let weightSum = 0;

    const weights = {
      '1': 0.5,
      '2': 0.25,
      '3': 0.1,
      '4': 0.15,
    };

    for (const answer of surveyAnswers) {
      let score = 0;

      if (answer.type === '1') {
        const rating = parseInt(answer.answer);
        if (rating >= 0 && rating <= 6) score = -1;
        else if (rating >= 7 && rating <= 8) score = 0;
        else if (rating >= 9 && rating <= 10) score = 1;

      } else if (answer.type === '2') {
        const rating = parseInt(answer.answer);
        if (rating >= 1 && rating <= 2) score = -1;
        else if (rating === 3) score = 0;
        else if (rating >= 4 && rating <= 5) score = 1;

      } else if (answer.type === '3') {
        if (answer.answer.includes('qualidade') || answer.answer.includes('atendimento')) score = 1;
        else if (answer.answer.includes('tempo') || answer.answer.includes('preço')) score = -1;

      } else if (answer.type === '4') {
        const sentiment = await this.geminiAIService.classificationPromotorOrNot(answer.answer);
        if (sentiment === 'positivo') score = 1;
        else if (sentiment === 'neutro') score = 0;
        else if (sentiment === 'negativo') score = -1;
      }

      const weight = weights[answer.type] || 0;
      totalScore += score * weight;
      weightSum += weight;
    }

    const weightedAverage = totalScore / weightSum;

    if (weightedAverage > 0.5) {
      return 'Promotor';
    } else if (weightedAverage >= -0.5 && weightedAverage <= 0.5) {
      return 'Neutro';
    } else {
      return 'Detrator';
    }
  }
}