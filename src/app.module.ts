import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserModule } from './models/users/user.module';
import { IntegrationsModule } from './models/integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
