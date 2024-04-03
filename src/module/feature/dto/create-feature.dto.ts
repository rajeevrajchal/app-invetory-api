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
  system_id: string;
}
