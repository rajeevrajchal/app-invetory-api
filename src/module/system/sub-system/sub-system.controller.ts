import { CurrentUser } from '@decorators/current-user.decorator';
import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import { User } from '@module/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateSystemDto } from '../dto/create-system.dto';
import { SubSystemService } from './subsystem.service';

@Controller(':parent_system_id/sub-system')
@UseGuards(JwtAuthGuard)
export class SubSystemController {
  constructor(private readonly systemService: SubSystemService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Param('parent_system_id') parent_system_id: string,
    @Body() createSystemDto: CreateSystemDto,
  ) {
    return this.systemService.create(createSystemDto, parent_system_id, user);
  }

  @Get()
  findAll(
    @CurrentUser() user: User,
    @Param('parent_system_id') parent_system_id: string,
    @Query() query: any,
  ) {
    return this.systemService.findAll(parent_system_id, user, query);
  }
}
