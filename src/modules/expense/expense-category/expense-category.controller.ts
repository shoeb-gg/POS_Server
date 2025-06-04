import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { UserID } from 'src/core/utils/user.decorator';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { ExpenseCategory } from './entities/expense-category.entity';

@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<ExpenseCategory>> {
    return await this.expenseCategoryService.create(
      createExpenseCategoryDto,
      +userID,
    );
  }

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ): Promise<FindAllResponseDto<ExpenseCategory[]>> {
    return await this.expenseCategoryService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseDto<ExpenseCategory | null>> {
    return await this.expenseCategoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<ResponseDto<ExpenseCategory | null>> {
    return await this.expenseCategoryService.update(
      +id,
      updateExpenseCategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    return await this.expenseCategoryService.remove(+id);
  }
}
