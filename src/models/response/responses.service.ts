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

  async getById(id: string): Promise<Response> {
    return this.responseRepository.findOne({ id: id });
  }
}
