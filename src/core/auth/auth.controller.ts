import { Controller, Post, Body, Get } from '@nestjs/common';
import { USER } from 'src/models/user.DTO';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  //   @UseGuards(UserAuthGuard)
  @Post('auth/login')
  async login(@Body() userCreds) {
    console.log(userCreds.email);

    return await this.auth.login(userCreds.email, userCreds.password);
  }
}
