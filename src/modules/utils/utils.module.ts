import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { QuantityUnitModule } from './quantity_unit/quantity_unit.module';

@Module({
  imports: [BrandModule, CategoryModule, QuantityUnitModule],
  controllers: [],
  providers: [],
})
export class UtilsModule {}
