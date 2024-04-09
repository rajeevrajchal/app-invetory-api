import { UserCheckerService } from '@helpers/user-checker.service';
import { JwtStrategy } from '@middleware/strategy/jwt.strategy';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, User])],
  controllers: [VendorController],
  providers: [VendorService, UserCheckerService, JwtStrategy],
})
export class VendorModule {}
