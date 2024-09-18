import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name)
        private readonly companyRepository: Model<Company>,
    ) {}

    async findOne(id: string) {
        const company = this.companyRepository.findOne({ _id: id });

        if(!company) {
            throw new NotFoundException(`Cannot find company with id ${id}`);
        }

        return company;
    }

    async create(company: CreateCompanyDto) {
        return await this.companyRepository.create(company);
    }

    async update(id: string, payload: Partial<CreateCompanyDto>) {
        const company = await this.findOne(id);
  
        if (!company) {
          throw new Error(`Costumer with id ${id} not found`);
        }
      
        const newCompany = Object.assign(company, payload);
        await this.companyRepository.findOneAndUpdate({ _id: id }, newCompany);
    
        return newCompany;
    }

    async deleteOne(id: string) {
        const company = await this.companyRepository.deleteOne({ _id: id });

        if(!company.deletedCount) {
            throw new NotFoundException(`Cannot find company with id ${id}`);
        }

        return {};
    }
}
