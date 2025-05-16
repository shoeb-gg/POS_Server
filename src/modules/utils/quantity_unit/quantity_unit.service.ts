import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuantityUnitDto } from './dto/create-quantity_unit.dto';
import { UpdateQuantityUnitDto } from './dto/update-quantity_unit.dto';
import { PrismaService } from 'src/prisma.service';
import { QuantityUnit } from './entities/quantity_unit.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';

@Injectable()
export class QuantityUnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createQuantityUnitDto: CreateQuantityUnitDto,
    userId: number,
  ): Promise<ResponseDto> {
    try {
      const newQuantityUnit: QuantityUnit =
        await this.prisma.quantity_unit.create({
          data: { ...createQuantityUnitDto, user_id: userId },
          select: {
            id: true,
            name: true,
            short_name: true,
          },
        });

      return {
        data: newQuantityUnit,
        success: true,
        message: 'Quantity Unit Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Quantity Unit!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [quantityUnits, total]: [QuantityUnit[], number] =
        await this.prisma.$transaction([
          this.prisma.quantity_unit.findMany({
            where: conditions,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            orderBy: {
              name: 'asc',
            },
            select: {
              id: true,
              name: true,
              short_name: true,
            },
          }),
          this.prisma.quantity_unit.count({
            where: conditions,
          }),
        ]);

      return {
        data: { quantityUnits, total },
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Quantity Units Fetched Successfully!',
        status:
          quantityUnits.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Quantity Units!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const quantityUnit: QuantityUnit | null =
        await this.prisma.quantity_unit.findUnique({
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
            short_name: true,
          },
        });

      return {
        data: quantityUnit ? quantityUnit : {},
        success: quantityUnit ? true : false,
        message: quantityUnit
          ? 'Quantity Unit Fetched Successfully!'
          : `No Quantity Unit Found with id ${id}`,
        status: quantityUnit ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Quantity Unit!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateQuantityUnitDto: UpdateQuantityUnitDto) {
    try {
      const quantityUnit: QuantityUnit | null =
        await this.prisma.quantity_unit.update({
          data: {
            ...updateQuantityUnitDto,
          },
          where: {
            id: id,
          },
          select: {
            id: true,
            name: true,
            short_name: true,
          },
        });

      return {
        data: quantityUnit ? quantityUnit : {},
        success: quantityUnit ? true : false,
        message: quantityUnit
          ? 'Quantity Unit updated Successfully!'
          : `No Brand Quantity Unit with id ${id}`,
        status: quantityUnit ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Quantity Unit!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const quantityUnit: QuantityUnit | null =
        await this.prisma.quantity_unit.delete({
          where: {
            id: id,
          },
        });

      return {
        data: {},
        success: quantityUnit ? true : false,
        message: quantityUnit
          ? 'Quantity Unit deleted Successfully!'
          : `No Quantity Unit Found with id ${id}`,
        status: quantityUnit ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Quantity Unit!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
