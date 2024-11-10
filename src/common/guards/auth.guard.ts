import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { extractToken } from 'src/common/utils/extract-token';
import { AuthConfigService } from 'src/config/auth/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authConfigService: AuthConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractToken(request.headers);
    
    if (!token) {
      throw new UnauthorizedException('Bearer token was not provided.');
    }

    try {
      const { id, company } = await this.jwtService.verifyAsync(token, {
        secret: this.authConfigService.jwt_secret,
      });

      request['id'] = id;
      request['company'] = company;
    } catch {
      throw new UnauthorizedException('Failed to verify bearer token.');
    }

    return true;
  }
}
