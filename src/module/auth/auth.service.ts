import messages from '@constants/message';
import { User } from '@module/user/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: { req: any; isOAuth?: boolean }) {
    try {
      const { req, isOAuth } = payload;
      const user = req?.user || req?.userFromDBWithProvider;

      if (!user) {
        throw new UnauthorizedException(messages['email_password_invalid']);
      }

      const tokenPayload = {
        email: user?.email,
        username: user?.email,
        sub: user?.id,
      };

      const access_token = this.jwtService.sign(tokenPayload);

      if (isOAuth) {
        const link = `${this.configService.get<string>('FRONTEND_URL')}/login/?token=${access_token}`;
        return {
          messages: messages.login_success,
          url: link,
        };
      }
      return {
        access_token: access_token,
        user,
        message: messages.login_success,
      };
    } catch (error) {
      throw new HttpException(
        messages.login_error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async google_login() {
    try {
      const authUrl = 'https://accounts.google.com/o/oauth2/auth';
      const clientId = this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID');

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: this.configService.get<string>(
          'GOOGLE_AUTH_CALLBACK_URL',
        ),
        response_type: 'code',
        scope: 'profile email',
      });

      const url = `${authUrl}?${params.toString()}`;
      return {
        messages: 'google login lol',
        redirect_url: url,
      };
    } catch (error) {
      throw new HttpException(
        messages.login_error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
