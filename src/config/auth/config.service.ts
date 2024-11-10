import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get jwt_secret(): string {
    const data = this.configService.get<string>('AUTH_JWT_SECRET');

    return data;
  }
}
