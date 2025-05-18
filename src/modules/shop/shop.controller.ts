import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { ResponseDto } from 'src/common/models/response.dto';
import { UserID } from 'src/core/utils/user.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<Shop>> {
    return await this.shopService.create(createShopDto, userID);
  }

  @Get('all')
  async findAll(): Promise<ResponseDto<Shop[]>> {
    return await this.shopService.findAll();
  }

  @Get('for-user')
  async findAllForUser(@UserID() userID: number): Promise<ResponseDto<Shop[]>> {
    return await this.shopService.findAllForUser(userID);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Shop | null>> {
    return await this.shopService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ): Promise<ResponseDto<Shop | null>> {
    return await this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
    return await this.shopService.remove(+id);
  }
}
