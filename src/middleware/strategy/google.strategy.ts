import messages from '@constants/message';
import { UserCheckerService } from '@helpers/user-checker.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
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
      const userFromDBWithPassword = await this.userCheckService.checkUserExist(
        google_user.email,
      );
      if (userFromDBWithPassword) {
        throw new ForbiddenException(
          `User already exists, but ${userFromDBWithProvider.auth_provider} account was not connected to user's account`,
        );
      }
      throw new BadRequestException(messages.login_error);
    }

    return userFromDBWithProvider;
  }
}

// {
//     id: '107953300934435610461',
//     displayName: 'Rajeev Rajchal',
//     name: { familyName: 'Rajchal', givenName: 'Rajeev' },
//     emails: [ [Object] ],
//     photos: [ [Object] ],
//     provider: 'google',
//     _raw: '{\n' +
//       '  "sub": "107953300934435610461",\n' +
//       '  "name": "Rajeev Rajchal",\n' +
//       '  "given_name": "Rajeev",\n' +
//       '  "family_name": "Rajchal",\n' +
//       '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ87awgmwYIbCoSaGS39h1yoITRoAbi_WgbSl9xik78PEo\\u003ds96-c",\n' +
//       '  "email": "kdark669@gmail.com",\n' +
//       '  "email_verified": true,\n' +
//       '  "locale": "en"\n' +
//       '}',
//     _json: {
//       sub: '107953300934435610461',
//       name: 'Rajeev Rajchal',
//       given_name: 'Rajeev',
//       family_name: 'Rajchal',
//       picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ87awgmwYIbCoSaGS39h1yoITRoAbi_WgbSl9xik78PEo=s96-c',
//       email: 'kdark669@gmail.com',
//       email_verified: true,
//       locale: 'en'
//     }
//   }
// }
