import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UserID } from 'src/core/auth/utils/user.decorator';
import { ResponseDto } from 'src/common/models/response.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UserID() userID: number,
  ): Promise<ResponseDto> {
    return await this.brandService.create(createBrandDto, +userID);
  }

  @Get('all/:pageNumber/:pageSize')
  async findAll(
    @Param('pageNumber') pageNumber: number,
    @Param('pageSize') pageSize: number,
    @UserID() userID: number,
  ) {
    return await this.brandService.findAll(+pageNumber, +pageSize, +userID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
