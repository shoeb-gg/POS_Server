import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Category } from './entities/category.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<ResponseDto<Category>> {
    try {
      const newCategory: Category = await this.prisma.category.create({
        data: { ...createCategoryDto, user_id: userId },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        data: newCategory,
        success: true,
        message: 'Category Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<Category[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [categories, total]: [Category[], number] =
        await this.prisma.$transaction([
          this.prisma.category.findMany({
            where: conditions,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            orderBy: {
              name: 'asc',
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          }),
          this.prisma.category.count({
            where: conditions,
          }),
        ]);

      return {
        data: categories,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Category Fetched Successfully!',
        status: categories.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<Category | null>> {
    try {
      const category: Category | null = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        data: category ? category : null,
        success: category ? true : false,
        message: category
          ? 'Category Fetched Successfully!'
          : `No Category Found with id ${id}`,
        status: category ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseDto<Category | null>> {
    try {
      const category: Category | null = await this.prisma.category.update({
        data: {
          ...updateCategoryDto,
        },
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        data: category ? category : null,
        success: category ? true : false,
        message: category
          ? 'Category updated Successfully!'
          : `No Category Found with id ${id}`,
        status: category ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const category: Category | null = await this.prisma.category.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        success: category ? true : false,
        message: category
          ? 'Category deleted Successfully!'
          : `No Category Found with id ${id}`,
        status: category ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Category!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
