import { INestApplication } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthConfigService } from "src/config/auth/config.service";

const getGuards = (app: INestApplication) => {
    return [
        new AuthGuard(
            app.get(Reflector),
            app.get(JwtService),
            app.get(AuthConfigService),
        ),
    ];
};

export default getGuards;