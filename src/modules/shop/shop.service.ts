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

  findAll() {
    return `This action returns all shop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
