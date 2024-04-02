import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemDto } from './create-feature.dto';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {}
