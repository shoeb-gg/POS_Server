import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ShopController],
  providers: [PrismaService, ShopService],
})
export class ShopModule {}
