import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/common/models/response.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createExpenseDto: CreateExpenseDto,
  ): Promise<ResponseDto<Expense>> {
    try {
      const newExpense: Expense = await this.prisma.expense.create({
        data: { ...createExpenseDto },
        select: {
          id: true,
          name: true,
          amount: true,
          shop_id: true,
          expense_to_currency: {
            select: {
              id: true,
              name: true,
              short_name: true,
              symbol: true,
            },
          },
          expense_to_expense_category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        data: newExpense,
        success: true,
        message: 'Expense Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Expense!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
