import { LocalAuthGuard } from '@guard/local-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() login_input: LoginDto, @Req() req): Promise<any> {
    return this.authService.login(req);
  }
}
