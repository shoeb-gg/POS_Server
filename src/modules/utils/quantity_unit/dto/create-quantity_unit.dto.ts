import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateQuantityUnitDto {
  @IsOptional()
  @IsPositive()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  short_name: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;
}
