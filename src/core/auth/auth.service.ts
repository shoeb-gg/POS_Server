import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER } from '../user/user.DTO';
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
      const { password, id, ...result } = user;

      return {
        access_token: this.jwtService.sign({ id }),
      };
    }
    return null;
  }
}
