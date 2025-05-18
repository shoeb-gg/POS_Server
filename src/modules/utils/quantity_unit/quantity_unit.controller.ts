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
import { QuantityUnitService } from './quantity_unit.service';
import { CreateQuantityUnitDto } from './dto/create-quantity_unit.dto';
import { UpdateQuantityUnitDto } from './dto/update-quantity_unit.dto';
import { QuantityUnit } from './entities/quantity_unit.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { UserID } from 'src/core/utils/user.decorator';

@Controller('quantity-unit')
export class QuantityUnitController {
  constructor(private readonly quantityUnitService: QuantityUnitService) {}

  @Post()
  async create(
    @Body() createQuantityUnitDto: CreateQuantityUnitDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<QuantityUnit>> {
    return await this.quantityUnitService.create(
      createQuantityUnitDto,
      +userID,
    );
  }

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ): Promise<FindAllResponseDto<QuantityUnit[]>> {
    return await this.quantityUnitService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseDto<QuantityUnit | null>> {
    return await this.quantityUnitService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuantityUnitDto: UpdateQuantityUnitDto,
  ): Promise<ResponseDto<QuantityUnit | null>> {
    return await this.quantityUnitService.update(+id, updateQuantityUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    return await this.quantityUnitService.remove(+id);
  }
}
