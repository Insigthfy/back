import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Costumer } from './entities/costumer.entity';
import { CreateCostumerDto } from './dto/create-costumer.dto';

@Injectable()
export class CostumersService {
  constructor(
    @InjectModel(Costumer.name)
    private readonly costumerRepository: Model<Costumer>,
  ) {}

  async find() {
    return await this.costumerRepository.find();
  }
  
  async findOne(id: string) {
    return await this.costumerRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.costumerRepository.findOne({ email });
  }

  async findByCompany(id: string) {
    const company = new Types.ObjectId(id);

    return await this.costumerRepository.find({ company });
  }

  async findByBase(base: string) {
    return await this.costumerRepository.find({ base });
  }

  async create(costumer: CreateCostumerDto) {
    return await this.costumerRepository.create(costumer);
  }

  async update(id: string, payload: Partial<CreateCostumerDto>) {
    const costumer = await this.findOne(id);
  
    if (!costumer) {
      throw new Error(`Costumer with id ${id} not found`);
    }
  
    const updatedCostumer = Object.assign(costumer, payload);
  
    await this.costumerRepository.findOneAndUpdate({ _id: id }, updatedCostumer);

    return updatedCostumer;
  }  

  async deleteOne(id: string): Promise<void> {
    const costumerDeleted = await this.costumerRepository.deleteOne({ _id: id });

    if (!costumerDeleted.deletedCount) {
      throw new NotFoundException(`Cannot find a customer with id ${id}`);
    }
  }
}
