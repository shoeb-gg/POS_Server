import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuantityUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  short_name: string;
}
