import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ) {
    return await this.brandService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDto> {
    return await this.brandService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseDto> {
    return await this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto> {
    return await this.brandService.remove(+id);
  }
}
