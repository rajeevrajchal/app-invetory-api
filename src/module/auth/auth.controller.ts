import { CurrentUser } from '@decorators/current-user.decorator';
import { LocalAuthGuard } from '@guard/local-auth.guard';
import { GoogleAuthGuard } from '@middleware/guard/google-auth.guard';
import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req): Promise<any> {
    return this.authService.login({ req });
  }

  @Post('google/login')
  google(): Promise<any> {
    return this.authService.google_login();
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  google_callback(@Req() req, @Res() res): Promise<any> {
    return this.authService.login({
      req: req,
      isOAuth: true,
      res: res,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('who-i-am')
  async whoIAm(@CurrentUser() user: any): Promise<any> {
    return this.authService.whoIAm(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@CurrentUser() user: any): Promise<any> {
    return this.authService.logout(user);
  }
}
