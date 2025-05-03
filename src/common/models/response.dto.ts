import { HttpStatus } from '@nestjs/common';

export type ResponseDto = {
  data?: any;
  success: boolean;
  message: string;
  status: HttpStatus;
};
