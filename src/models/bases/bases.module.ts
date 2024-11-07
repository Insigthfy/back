import { Module } from '@nestjs/common';
import { BasesController } from './bases.controller';
import { BasesService } from './bases.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from './entities/base.entity';
import { CostumersModule } from '../costumers/costumers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Base.name, schema: BaseSchema },
    ]),
    CostumersModule
  ],
  controllers: [BasesController],
  providers: [BasesService]
})
export class BasesModule {}
