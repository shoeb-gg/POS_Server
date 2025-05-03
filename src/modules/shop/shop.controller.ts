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
import { ResponseDto } from 'src/common/models/response.dto';
import { User } from 'src/core/auth/utils/user.decorator';
import { USER_Decor } from 'src/common/models/userDecorator.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
    @User() user: USER_Decor,
  ): Promise<ResponseDto> {
    return await this.shopService.create(createShopDto, user.id);
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
