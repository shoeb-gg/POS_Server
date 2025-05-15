import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/common/models/response.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
    userId: number,
  ): Promise<ResponseDto> {
    try {
      const newBrand: Brand = await this.prisma.brand.create({
        data: { ...createBrandDto, user_id: userId },
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
    pageNumber: number,
    pageSize: number,
    userId: number,
  ): Promise<ResponseDto> {
    try {
      const [brands, total]: [Brand[], number] = await this.prisma.$transaction(
        [
          this.prisma.brand.findMany({
            where: {
              user_id: userId,
            },
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
          this.prisma.brand.count(),
        ],
      );

      return {
        data: { brands, total },
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

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
