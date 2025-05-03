import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  //   @UseGuards(UserAuthGuard)
  @Post('login')
  async login(@Body() userCreds) {
    return await this.auth.login(userCreds.email, userCreds.password);
  }
}
