import messages from '@constants/message';
import { Global, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCheckerService } from './user-checker.service';

@Global()
@Injectable()
export class ValidateUser {
  constructor(private readonly userChecker: UserCheckerService) {}

  async validateLoginUser(email: string, password: string): Promise<any> {
    try {
      const loginUser: any = await this.userChecker.checkUserExist(email);

      if (!loginUser) {
        throw new UnauthorizedException(messages.email_password_invalid);
      }

      const passwordValid: boolean = await bcrypt.compare(
        password,
        loginUser.password,
      );
      if (passwordValid) {
        return loginUser;
      }
      return null as any;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
