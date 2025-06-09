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
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ResponseDto } from 'src/common/models/response.dto';
import { Currency } from './entities/currency.entity';
import { UserID } from 'src/core/utils/user.decorator';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @UserID() userID: number,
  ): Promise<ResponseDto<Currency>> {
    return await this.currencyService.create(createCurrencyDto, +userID);
  }

  @Get('all')
  async findAll(
    @UserID() userID: number,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ) {
    return await this.currencyService.findAll(
      +userID,
      +pageNumber,
      +pageSize,
      query,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ResponseDto<Currency | null>> {
    return await this.currencyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<ResponseDto<Currency | null>> {
    return await this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    return await this.currencyService.remove(+id);
  }
}
