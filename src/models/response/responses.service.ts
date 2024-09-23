import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './entities/response.entity';
import { Model } from 'mongoose';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly responseRepository: Model<Response>,
  ) {}

  async getSurveyById(id: string): Promise<Response> {
    return this.responseRepository.findOne(
      {
        responses: {
          $elemMatch: {
            '0.id': id,
          },
        },
      },
      {
        _id: 0,
        id: 1,
      },
    );
  }

  async create(id: string, response: any): Promise<void> {
    await this.responseRepository
      .updateOne({ id: id }, { $push: { responses: response } })
      .exec();
  }
}
