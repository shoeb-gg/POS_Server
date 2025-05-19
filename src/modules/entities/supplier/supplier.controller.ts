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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { UserID } from 'src/core/utils/user.decorator';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<Supplier | null>> {
    return await this.supplierService.create(createSupplierDto, +userID);
  }

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ): Promise<FindAllResponseDto<Supplier[]>> {
    return await this.supplierService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseDto<Supplier | null>> {
    return await this.supplierService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<ResponseDto<Supplier | null>> {
    return await this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    return await this.supplierService.remove(+id);
  }
}
