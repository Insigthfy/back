import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './entities/response.entity';
import { Model } from 'mongoose';
import { CreateResponseDto } from './dto/create.response.dto';
import { SurveysService } from '../survey/surveys.service';
import { ResponseResponse } from './dto/output.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TopicsService } from '../topics/topics.service';
import { TopicResponse } from '../topics/dto/output.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
    private readonly surveysService: SurveysService,
    private readonly topicsService: TopicsService,
  ) {}

  async getSurveyById(id: string): Promise<ResponseResponse[]> {
    return await this.responseRepository.find({ survey: id });
  }

  async create(response: CreateResponseDto) {
    await this.surveysService.getById(response.survey);

    const topic = await this.topicClassification(
      response.survey_answers.map((e) => e.answer).join('  '),
    );

    return await this.responseRepository.create({
      ...response,
      topic: topic.id,
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
}
