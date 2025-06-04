import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from 'src/prisma.service';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { ExpenseCategory } from './entities/expense-category.entity';

@Injectable()
export class ExpenseCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
    userId: number,
  ): Promise<ResponseDto<ExpenseCategory>> {
    try {
      const newExpenseCategory: ExpenseCategory =
        await this.prisma.expense_category.create({
          data: { ...createExpenseCategoryDto, user_id: userId },
          select: {
            id: true,
            name: true,
          },
        });

      return {
        data: newExpenseCategory,
        success: true,
        message: 'Expense Category Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Expense Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<ExpenseCategory[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [expenseCategories, total]: [ExpenseCategory[], number] =
        await this.prisma.$transaction([
          this.prisma.expense_category.findMany({
            where: conditions,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            orderBy: {
              name: 'asc',
            },
            select: {
              id: true,
              name: true,
            },
          }),
          this.prisma.expense_category.count({
            where: conditions,
          }),
        ]);

      return {
        data: expenseCategories,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Expense Categories Fetched Successfully!',
        status:
          expenseCategories.length === 0
            ? HttpStatus.NO_CONTENT
            : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Expense Categories!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<ExpenseCategory | null>> {
    try {
      const expenseCategory: ExpenseCategory | null =
        await this.prisma.expense_category.findUnique({
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
          },
        });

      return {
        data: expenseCategory ? expenseCategory : null,
        success: expenseCategory ? true : false,
        message: expenseCategory
          ? 'Expense Category Fetched Successfully!'
          : `No Expense Category Found with id ${id}`,
        status: expenseCategory ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Expense Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<ResponseDto<ExpenseCategory | null>> {
    try {
      const expenseCategory: ExpenseCategory | null =
        await this.prisma.expense_category.update({
          data: {
            ...updateExpenseCategoryDto,
          },
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
          },
        });

      return {
        data: expenseCategory ? expenseCategory : null,
        success: expenseCategory ? true : false,
        message: expenseCategory
          ? 'Expense Category updated Successfully!'
          : `No Expense Category Found with id ${id}`,
        status: expenseCategory ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Expense Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const expenseCategory: ExpenseCategory | null =
        await this.prisma.expense_category.delete({
          where: {
            id: id,
          },
        });

      return {
        data: null,
        success: expenseCategory ? true : false,
        message: expenseCategory
          ? 'Expense Category deleted Successfully!'
          : `No Expense Category Found with id ${id}`,
        status: expenseCategory ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Expense Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
