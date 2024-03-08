import messages from '@constants/message';
import { User } from '@module/user/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(req: any) {
    try {
      const user = req?.user;

      if (!user) {
        throw new UnauthorizedException(messages['email_password_invalid']);
      }

      const tokenPayload = {
        email: user?.email,
        username: user?.email,
        sub: user?.id,
      };

      const access_token = this.jwtService.sign(tokenPayload);

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
}
