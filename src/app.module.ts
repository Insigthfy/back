import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserModule } from './models/users/user.module';
import { IntegrationsModule } from './models/integrations/integrations.module';
import { GeminAIModule } from './models/gemini-ai/gemini-ai.module';

@Module({
  imports: [IntegrationsModule, GeminAIModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
