import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER } from '../../models/user.DTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user: USER | null = await this.users.findUser(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      const payload = result;
      return {
        access_token: this.jwtService.sign(payload),
        ...result,
      };
    }
    return null;
  }
}
