import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ResponseDto } from 'src/common/models/response.dto';
import { UserAuthGuard } from 'src/core/auth/utils/user-auth.guard';
import { UserID } from 'src/core/auth/utils/user.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
    @UserID() userID: number,
  ): Promise<ResponseDto> {
    return await this.shopService.create(createShopDto, userID);
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
