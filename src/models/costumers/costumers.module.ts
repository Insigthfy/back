import { Module } from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { CostumersController } from './costumers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Costumer, CostumerSchema } from './entities/costumer.entity';

@Module({
  imports: [MongooseModule.forFeature([ { name: Costumer.name, schema: CostumerSchema } ])],
  providers: [CostumersService],
  controllers: [CostumersController],
})
export class CostumersModule {}
