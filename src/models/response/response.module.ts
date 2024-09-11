import { Module } from '@nestjs/common';
import { Response, ResponseSchema } from "./entities/response.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './response.controller';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([ { name: Response.name, schema: ResponseSchema } ])],
  providers: [ResponsesService],
  controllers: [ResponsesController],
  exports: [ResponsesService],
})
export class ResponseModule {}
