import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma.service';
import { Supplier } from './entities/supplier.entity';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSupplierDto: CreateSupplierDto,
    userId: number,
  ): Promise<ResponseDto<Supplier>> {
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

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<Supplier[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [suppliers, total]: [Supplier[], number] =
        await this.prisma.$transaction([
          this.prisma.supplier.findMany({
            where: conditions,
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            orderBy: {
              name: 'asc',
            },
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
          }),
          this.prisma.supplier.count({
            where: conditions,
          }),
        ]);

      return {
        data: suppliers,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Suppliers Fetched Successfully!',
        status: suppliers.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Suppliers!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<Supplier | null>> {
    try {
      const supplier: Supplier | null = await this.prisma.supplier.findUnique({
        where: {
          id: id,
        },
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
        data: supplier ? supplier : null,
        success: supplier ? true : false,
        message: supplier
          ? 'Supplier Fetched Successfully!'
          : `No Supplier Found with id ${id}`,
        status: supplier ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Supplier!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<ResponseDto<Supplier | null>> {
    try {
      const supplier: Supplier | null = await this.prisma.supplier.update({
        data: {
          ...updateSupplierDto,
        },
        where: {
          id: id,
        },
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
        data: supplier ? supplier : null,
        success: supplier ? true : false,
        message: supplier
          ? 'Supplier updated Successfully!'
          : `No Supplier Found with id ${id}`,
        status: supplier ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Supplier!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const supplier: Supplier | null = await this.prisma.supplier.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        success: supplier ? true : false,
        message: supplier
          ? 'Supplier deleted Successfully!'
          : `No Supplier Found with id ${id}`,
        status: supplier ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Supplier!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
