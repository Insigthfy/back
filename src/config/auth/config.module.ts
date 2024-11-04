import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AuthConfigService } from "./config.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                JWT_TOKEN: Joi.string(),
            }),
        }),
    ],
    providers: [ConfigService, AuthConfigService],
    exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}