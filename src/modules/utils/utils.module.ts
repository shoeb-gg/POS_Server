import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [BrandModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class UtilsModule {}
