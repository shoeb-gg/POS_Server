import { PartialType } from '@nestjs/swagger';
import { CreateQuantityUnitDto } from './create-quantity_unit.dto';

export class UpdateQuantityUnitDto extends PartialType(CreateQuantityUnitDto) {}
