import { HttpStatus } from '@nestjs/common';

export type ResponseDto = {
  data?: any;
  pagination?: any;
  success: boolean;
  message: string;
  status: HttpStatus;
};
