import { LocalAuthGuard } from '@guard/local-auth.guard';
import { GoogleAuthGuard } from '@middleware/guard/google-auth.guard';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req): Promise<any> {
    return this.authService.login({ req });
  }

  @Get('google/login')
  google(): Promise<any> {
    return this.authService.google_login();
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  google_callback(@Req() req): Promise<any> {
    return this.authService.login({
      req: req,
      isOAuth: true,
    });
  }
}
