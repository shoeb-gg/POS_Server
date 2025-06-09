import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  short_name: string;

  @IsOptional()
  @IsString()
  symbol?: string | null;
}
