import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';

@Module({
    imports: [MongooseModule.forFeature([ { name: Company.name, schema: CompanySchema } ])],
    providers: [CompaniesService],
    controllers: [CompaniesController],
    exports: [CompaniesService]
})
export class CompaniesModule {}
