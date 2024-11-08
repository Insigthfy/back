import {
  forwardRef, Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './entities/response.entity';
import { Model } from 'mongoose';
import { CreateResponseDto } from './dto/create.response.dto';
import { SurveysService } from '../survey/surveys.service';
import { ResponseResponse } from './dto/output.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TopicsService } from '../topics/topics.service';
import { TopicResponse } from '../topics/dto/output.dto';
import { ResponsePromoterService } from "../responsePromoter/response-promoter.service";

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
    private readonly surveysService: SurveysService,
    private readonly topicsService: TopicsService,
    private readonly responsePromotorService: ResponsePromoterService,
  ) {}

  async getSurveyById(id: string): Promise<ResponseResponse[]> {
    return this.responseRepository.find({ survey: id });
  }

  async create(response: CreateResponseDto) {
    await this.surveysService.getById(response.survey);

    const topic = await this.topicClassification(
      response.survey_answers.map((e) => e.answer).join('  '),
    );

    const npsClassification = await this.responsePromotorService.calculateNpsClassification(response.survey_answers);

    return await this.responseRepository.create({
      ...response,
      topic: topic.id,
      // nps_classification: npsClassification,
      date: new Date(),
    });
  }

  async topicClassification(answers: string): Promise<TopicResponse> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const topics: TopicResponse[] = await this.topicsService.find();

    if (!topics) throw new NotFoundException('Sem tópicos encontrados');

    const topicsNames = topics.map((e) => e.name).join('  ');

    const selectedTopic = await model.generateContent(
      'Based on the topics i will give you, classify the answer on ONE of them. return only the name of the topic chosen. Give me only the name of the topic, no more information. If none of then are good choose the first of the topics passed. Topics: ' +
        topicsNames +
        '. answer: ' +
        answers,
    );
    const res = selectedTopic.response.text().trim();

    const data = topics.filter((e) => e.name == res);

    if (!data)
      throw new InternalServerErrorException(
        'Não classificamos em nenhum tópico',
      );
    return data[0];
  }

  async getNpsDistribution() {
    return this.responseRepository.aggregate([
      { $unwind: '$survey_answers' },
      { $match: { 'survey_answers.type': 'nps' } },
      {
        $group: {
          _id: {
            $cond: [
              { $lte: ['$survey_answers.score', 6] }, 'Detrator',
              { $cond: [
                  { $lte: ['$survey_answers.score', 8] }, 'Neutro', 'Promotor'
                ]}
            ]
          },
          count: { $sum: 1 }
        }
      }
    ]);
  }

  async getTopResponsePeriod() {
    return this.responseRepository.aggregate([
      { $unwind: '$survey_answers' },
      { $match: { 'survey_answers.type': 'nps' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$survey_answers.date' } },
          totalResponses: { $sum: 1 }
        }
      },
      { $sort: { totalResponses: -1 } },
      { $limit: 1 }
    ]);
  }

  async getNpsEvolution() {
    return this.responseRepository.aggregate([
      { $unwind: '$survey_answers' },
      { $match: { 'survey_answers.type': 'nps' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$survey_answers.date' } },
          total: { $sum: 1 },
          detratores: { $sum: { $cond: [{ $lte: ['$survey_answers.score', 6] }, 1, 0] } },
          neutros: { $sum: { $cond: [{ $and: [{ $gte: ['$survey_answers.score', 7] }, { $lte: ['$survey_answers.score', 8] }] }, 1, 0] } },
          promotores: { $sum: { $cond: [{ $gte: ['$survey_answers.score', 9] }, 1, 0] } }
        }
      },
      {
        $project: {
          total: 1,
          detratores: 1,
          neutros: 1,
          promotores: 1,
          npsScore: {
            $multiply: [
              { $divide: [{ $subtract: ['$promotores', '$detratores'] }, '$total'] },
              100
            ]
          }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
  }
}
