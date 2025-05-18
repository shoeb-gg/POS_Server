import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { PrismaService } from 'src/prisma.service';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
    userId: number,
  ): Promise<ResponseDto<Brand>> {
    try {
      const newBrand: Brand = await this.prisma.brand.create({
        data: { ...createBrandDto, user_id: userId },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        data: newBrand,
        success: true,
        message: 'Brand Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Brand!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<Brand[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [brands, total]: [Brand[], number] = await this.prisma.$transaction(
        [
          this.prisma.brand.findMany({
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
          this.prisma.brand.count({
            where: conditions,
          }),
        ],
      );

      return {
        data: brands,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Brands Fetched Successfully!',
        status: brands.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Brands!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<Brand | null>> {
    try {
      const brand: Brand | null = await this.prisma.brand.findUnique({
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
        data: brand ? brand : null,
        success: brand ? true : false,
        message: brand
          ? 'Brand Fetched Successfully!'
          : `No Brand Found with id ${id}`,
        status: brand ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Brand!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseDto<Brand | null>> {
    try {
      const brand: Brand | null = await this.prisma.brand.update({
        data: {
          ...updateBrandDto,
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
        data: brand ? brand : null,
        success: brand ? true : false,
        message: brand
          ? 'Brand updated Successfully!'
          : `No Brand Found with id ${id}`,
        status: brand ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Brand!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const brand: Brand | null = await this.prisma.brand.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        success: brand ? true : false,
        message: brand
          ? 'Brand deleted Successfully!'
          : `No Brand Found with id ${id}`,
        status: brand ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Brand!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
