import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { MongoConfigService } from "./consig.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                DB_HOST: Joi.string().default("localhost"),
                DB_PORT: Joi.number().default(1433),
                DB_USERNAME: Joi.string(),
                DB_PASSWORD: Joi.string(),
                DB_DATABASE: Joi.string().default("insigthfy")
            }),
        }),
    ],
    providers: [ConfigService, MongoConfigService],
    exports: [ConfigService, MongoConfigService],
})
export class SqlServerConfigModule {}
