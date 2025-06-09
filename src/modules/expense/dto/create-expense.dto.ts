import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  expense_category: number;

  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsInt()
  shop_id: number;

  @IsNotEmpty()
  @IsInt()
  currency: number;
}
