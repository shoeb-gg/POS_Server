import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBrandDto {
  @IsOptional()
  @IsPositive()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  image: string | null;

  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;
}
