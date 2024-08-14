import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongoConfigService {
    constructor(private configService: ConfigService) {}

    get uri(): string {
        const host = this.configService.get<string>('db.host');
        const port = this.configService.get<number>('db.port');
        const user = this.configService.get<string>('db.user');
        const password = this.configService.get<string>('db.password');
        const database = this.configService.get<string>('db.database');

        let uri = ``

        return uri;
    }
}