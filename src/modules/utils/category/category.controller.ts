import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseDto } from 'src/common/models/response.dto';
import { UserID } from 'src/core/auth/utils/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UserID() userID: number,
  ): Promise<ResponseDto> {
    return await this.categoryService.create(createCategoryDto, +userID);
  }

  @Get('all/:pageNumber/:pageSize')
  async findAll(
    @Param('pageNumber') pageNumber: number,
    @Param('pageSize') pageSize: number,
    @UserID() userID: number,
  ): Promise<ResponseDto> {
    return await this.categoryService.findAll(+pageNumber, +pageSize, +userID);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDto> {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseDto> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto> {
    return await this.categoryService.remove(+id);
  }
}
