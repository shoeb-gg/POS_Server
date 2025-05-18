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
import { Brand } from './entities/brand.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { UserID } from 'src/core/utils/user.decorator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<Brand>> {
    return await this.brandService.create(createBrandDto, +userID);
  }

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ): Promise<FindAllResponseDto<Brand[]>> {
    return await this.brandService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDto<Brand | null>> {
    return await this.brandService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<ResponseDto<Brand | null>> {
    return await this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    return await this.brandService.remove(+id);
  }
}
