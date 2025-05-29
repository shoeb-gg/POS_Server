import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';
import {
  FindAllResponseDto,
  ResponseDto,
} from 'src/common/models/response.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    userId: number,
  ): Promise<ResponseDto<Customer>> {
    try {
      const newCustomer: Customer = await this.prisma.customer.create({
        data: { ...createCustomerDto, user_id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
          city: true,
          address: true,
          created_on: true,
          updated_on: true,
        },
      });

      return {
        data: newCustomer,
        success: true,
        message: 'Customer Created Successfully!',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while creating Customer!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    userId: number,
    pageNumber: number,
    pageSize: number,
    query: string = '',
  ): Promise<FindAllResponseDto<Customer[]>> {
    try {
      const conditions: any = {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      };

      const [customers, total]: [Customer[], number] =
        await this.prisma.$transaction([
          this.prisma.customer.findMany({
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
              address: true,
              created_on: true,
              updated_on: true,
            },
          }),
          this.prisma.customer.count({
            where: conditions,
          }),
        ]);

      return {
        data: customers,
        total: total,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
        success: true,
        message: 'Customers Fetched Successfully!',
        status: customers.length === 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching all Customers!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<ResponseDto<Customer | null>> {
    try {
      const customer: Customer | null = await this.prisma.customer.findUnique({
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
          address: true,
          created_on: true,
          updated_on: true,
        },
      });

      return {
        data: customer ? customer : null,
        success: customer ? true : false,
        message: customer
          ? 'Customer Fetched Successfully!'
          : `No Customer Found with id ${id}`,
        status: customer ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while fetching Customer!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<ResponseDto<Customer | null>> {
    try {
      const customer: Customer | null = await this.prisma.customer.update({
        data: {
          ...updateCustomerDto,
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
          address: true,
          created_on: true,
          updated_on: true,
        },
      });

      return {
        data: customer ? customer : null,
        success: customer ? true : false,
        message: customer
          ? 'Customer updated Successfully!'
          : `No Customer Found with id ${id}`,
        status: customer ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while updating Customer!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<ResponseDto<null>> {
    try {
      const customer: Customer | null = await this.prisma.customer.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        success: customer ? true : false,
        message: customer
          ? 'Customer deleted Successfully!'
          : `No Customer Found with id ${id}`,
        status: customer ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Server Error while deleting Customer!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
