import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
