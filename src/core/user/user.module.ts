import { UserService } from './user.service';
import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
