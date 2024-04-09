import { CurrentUser } from '@decorators/current-user.decorator';
import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import { User } from '@module/user/entities/user.entity';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Controller('vendors')
@UseGuards(JwtAuthGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  findAll(@CurrentUser() user: User, @Query() query: any) {
    return this.vendorService.findAll(user, query);
  }
}
