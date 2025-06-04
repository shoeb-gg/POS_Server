import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
  imports: [ExpenseCategoryModule],
})
export class ExpenseModule {}
