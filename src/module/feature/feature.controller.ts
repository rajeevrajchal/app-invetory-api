import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { FeatureService } from './feature.service';

@Controller('feature')
@UseGuards(JwtAuthGuard)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get(':system_id')
  findOne(@Param('system_id') system_id: string) {
    return this.featureService.findSystemFeature(system_id);
  }

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }
}
