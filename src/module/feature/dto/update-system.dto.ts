import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureDto } from './create-feature.dto';

export class updateFeatureDto extends PartialType(CreateFeatureDto) {}
