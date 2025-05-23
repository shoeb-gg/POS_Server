import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/common/models/response.dto';
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

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
