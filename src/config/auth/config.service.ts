import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
    constructor(private configService: ConfigService) {}
  
    get jwt_secret(): string {
        return this.configService.get<string>("auth.jwt_secret");
    }
}