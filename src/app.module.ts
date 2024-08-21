import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./models/users/user.module";
import { SurveyModule } from "./models/survey/survey.module";

@Module({
    imports: [
        UserModule,
        SurveyModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}