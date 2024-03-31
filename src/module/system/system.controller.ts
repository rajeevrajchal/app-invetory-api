import { CurrentUser } from '@decorators/current-user.decorator';
import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import { User } from '@module/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { SystemService } from './system.service';

@Controller('system')
@UseGuards(JwtAuthGuard)
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createSystemDto: CreateSystemDto) {
    return this.systemService.create(createSystemDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: any) {
    return this.systemService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto) {
    return this.systemService.update(id, updateSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemService.remove(id);
  }

  @Patch(':id/re-store')
  restore(@Param('id') id: string) {
    return this.systemService.restore(id);
  }
}
