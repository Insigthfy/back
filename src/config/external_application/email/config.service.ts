import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get port(): number {
    return this.configService.get<number>('mail.port');
  }

  get user(): string {
    return this.configService.get<string>('mail.user');
  }

  get password(): string {
    return this.configService.get<string>('mail.password');
  }

  get from(): string {
    return this.configService.get<string>('mail.from');
  }

  get transportConfig() {
    return {
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.password,
      },
    };
  }
}
