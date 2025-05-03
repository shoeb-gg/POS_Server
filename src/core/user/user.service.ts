import { Injectable } from '@nestjs/common';
import { USER } from './user.DTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findUser(email: string): Promise<USER | null> {
    try {
      const user: USER | null = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          last_name: true,
          first_name: true,
          phone: true,
          created_at: true,
          updated_at: true,
          user_type_col: true,
          password: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
