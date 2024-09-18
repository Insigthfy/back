import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SurveyModule } from './models/survey/survey.module';
import { MongoConfigModule } from './config/database/mongodb/config.module';
import { IntegrationsModule } from './models/integrations/integrations.module';
import { MongoConfigService } from './config/database/mongodb/config.service';
import { ResponseModule } from './models/response/response.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeminAIModule } from './models/gemini-ai/gemini-ai.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (configService: MongoConfigService) => ({
        uri: configService.uri,
      }),
      inject: [MongoConfigService],
    }),
    MongoConfigModule,
    IntegrationsModule,
    SurveyModule,
    ResponseModule,
    GeminAIModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
