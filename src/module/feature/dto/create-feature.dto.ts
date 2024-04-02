import { System } from '@module/system/entities/system.entity';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  system: Partial<System>;
}
