import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma.service';
import { Supplier } from './entities/supplier.entity';
import { ResponseDto } from 'src/common/models/response.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSupplierDto: CreateSupplierDto,
    userId: number,
  ): Promise<ResponseDto> {
    try {
      const newSupplier: Supplier = await this.prisma.supplier.create({
        data: { ...createSupplierDto, user_id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
          city: true,
          company: true,
          address: true,
          created_on: true,
          updated_on: true,
        },
      });

      return {
        data: newSupplier,
        success: true,
        message: 'Supplier Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Supplier!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all supplier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
