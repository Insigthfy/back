import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./models/users/user.module";

@Module({
    imports: [
        UserModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}