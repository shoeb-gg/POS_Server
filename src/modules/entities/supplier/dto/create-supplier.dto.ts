import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string | null;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('BD', { message: 'Invalid Bangladeshi phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  country?: string | null;

  @IsOptional()
  @IsString()
  city?: string | null;

  @IsOptional()
  @IsString()
  company?: string | null;

  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsDate()
  created_on?: Date;

  @IsOptional()
  @IsDate()
  updated_on?: Date;
}
