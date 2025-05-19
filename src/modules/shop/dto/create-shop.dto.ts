import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShopDto {
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsDate()
  updated_at?: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  type_of_shop?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
