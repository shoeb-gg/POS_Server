import { HttpStatus } from '@nestjs/common';

export type ResponseDto = {
  data: any;
  success: boolean;
  message: string;
  status: HttpStatus;
};

export type FindAllResponseDto = {
  data: any;
  pagination: Pagination;
  success: boolean;
  message: string;
  status: HttpStatus;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
};
