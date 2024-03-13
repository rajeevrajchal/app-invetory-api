import messages from '@constants/message';
import { UserCheckerService } from '@helpers/user-checker.service';
import { User } from '@module/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userCheckService: UserCheckerService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, _: any, profile: Profile): Promise<any> {
    const { name, emails, photos, id } = profile;
    const google_user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    const userFromDBWithProvider =
      await this.userCheckService.checkUserExistByAuthProvider(id);

    if (!userFromDBWithProvider) {
      const userFromDBWithPassword: User =
        await this.userCheckService.checkUserExist(google_user.email);
      if (userFromDBWithPassword) {
        await this.userCheckService.updateUserForOAuth(
          userFromDBWithPassword.id,
          {
            auth_provider: 'google',
            auth_provider_id: id,
          },
        );
        return userFromDBWithPassword;
      } else {
        throw new UnauthorizedException(messages.login_error);
      }
    }

    return userFromDBWithProvider;
  }
}
