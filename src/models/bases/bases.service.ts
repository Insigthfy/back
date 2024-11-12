import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { Base } from './entities/base.entity';
import { Model } from 'mongoose';
import { CreateBaseDto } from './dto/entity.dto';
import { CostumersService } from '../costumers/costumers.service';
import { ICostumer } from '../costumers/interfaces/costumer.interface';

@Injectable()
export class BasesService {
  constructor(
    @InjectModel(Base.name)
    private readonly baseRepository: Model<Base>,
    private readonly costumersService: CostumersService,
  ) {}

  async find() {
    const data = await this.baseRepository.find();
    return data;
  }

  async findByCompany(company: string) {
    return this.baseRepository.find({ company });
  }

  async create(buffer: Buffer, company, { name }: CreateBaseDto) {
    const newBase = await this.baseRepository.create({
      name,
      company
    });

    this.addUsers(buffer, newBase._id.toString());

    return newBase;
  }

  async addUsers(buffer: Buffer, id: string) {
    const results = [];
    const stream = Readable.from(buffer);

    const base: ICostumer[] = await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) =>
          results.push({
            ...row,
            base: id,
          }),
        )
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });

    base.forEach((element) => {
      this.costumersService.create(element);
    });
  }
}
