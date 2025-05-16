import { Module } from '@nestjs/common';
import { QuantityUnitService } from './quantity_unit.service';
import { QuantityUnitController } from './quantity_unit.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuantityUnitController],
  providers: [QuantityUnitService, PrismaService],
})
export class QuantityUnitModule {}
