import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateSystemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsString()
  repository: string;

  @IsEmpty()
  @IsString()
  branch: string;

  @IsEmpty()
  @IsString()
  location: string;

  @IsEmpty()
  @IsString()
  domain: string;

  @IsEmpty()
  @IsString()
  description: string;
}
