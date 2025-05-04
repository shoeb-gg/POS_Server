import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/common/models/response.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createShopDto: CreateShopDto,
    userId: number,
  ): Promise<ResponseDto> {
    try {
      const newShop: Shop = await this.prisma.shop.create({
        data: { ...createShopDto, user_id: userId },
      });

      return {
        data: newShop,
        success: true,
        message: 'Shop Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating product!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const shops: Shop[] = await this.prisma.shop.findMany();

      return {
        data: shops,
        success: true,
        message: 'Shops Fetched Successfully!',
        status: shops.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Shops!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllForUser(userId: number): Promise<ResponseDto> {
    try {
      const shops: Shop[] = await this.prisma.shop.findMany({
        where: {
          user_id: userId,
        },
      });

      return {
        data: shops,
        success: shops.length !== 0 ? true : false,
        message:
          shops.length !== 0
            ? 'Shops Fetched Successfully!'
            : `No Shop found for user `,
        status: shops.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Shops!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const shop: Shop | null = await this.prisma.shop.findUnique({
        where: {
          id: id,
        },
      });

      return {
        data: shop ? shop : {},
        success: shop ? true : false,
        message: shop
          ? 'Shop Fetched Successfully!'
          : `No Shop Found with id ${id}`,
        status: shop ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Shop!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<ResponseDto> {
    try {
      const shop: Shop | null = await this.prisma.shop.update({
        data: {
          ...updateShopDto,
        },
        where: {
          id: id,
        },
      });

      return {
        data: shop ? shop : {},
        success: shop ? true : false,
        message: shop
          ? 'Shop updated Successfully!'
          : `No Shop Found with id ${id}`,
        status: shop ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Shop!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const shop: Shop | null = await this.prisma.shop.delete({
        where: {
          id: id,
        },
      });

      return {
        data: {},
        success: shop ? true : false,
        message: shop
          ? 'Shop deleted Successfully!'
          : `No Shop Found with id ${id}`,
        status: shop ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Shop!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
