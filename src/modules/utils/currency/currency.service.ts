import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { PrismaService } from 'src/prisma.service';
import { Currency } from './entities/currency.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCurrencyDto: CreateCurrencyDto,
    userId: number,
  ): Promise<ResponseDto<Currency>> {
    try {
      const newCurrency: Currency = await this.prisma.currency.create({
        data: { ...createCurrencyDto, user_id: userId },
        select: {
          id: true,
          name: true,
          short_name: true,
          symbol: true,
        },
      });

      return {
        data: newCurrency,
        success: true,
        message: 'Currency Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Currency!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<Currency[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [currencies, total]: [Currency[], number] =
        await this.prisma.$transaction([
          this.prisma.currency.findMany({
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
              symbol: true,
            },
          }),
          this.prisma.currency.count({
            where: conditions,
          }),
        ]);

      return {
        data: currencies,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Currencies Fetched Successfully!',
        status: currencies.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Currencies!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<Currency | null>> {
    try {
      const currency: Currency | null = await this.prisma.currency.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          short_name: true,
          symbol: true,
        },
      });

      return {
        data: currency ? currency : null,
        success: currency ? true : false,
        message: currency
          ? 'Currency Fetched Successfully!'
          : `No Currency Found with id ${id}`,
        status: currency ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Currency!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<ResponseDto<Currency | null>> {
    try {
      const currency: Currency | null = await this.prisma.currency.update({
        data: {
          ...updateCurrencyDto,
        },
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          short_name: true,
          symbol: true,
        },
      });

      return {
        data: currency ? currency : null,
        success: currency ? true : false,
        message: currency
          ? 'Currency updated Successfully!'
          : `No Currency Found with id ${id}`,
        status: currency ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Currency!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const currency: Currency | null = await this.prisma.currency.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        success: currency ? true : false,
        message: currency
          ? 'Currency deleted Successfully!'
          : `No Currency Found with id ${id}`,
        status: currency ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Currency!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
