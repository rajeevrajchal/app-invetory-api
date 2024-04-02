import { UserCheckerService } from '@helpers/user-checker.service';
import { JwtStrategy } from '@middleware/strategy/jwt.strategy';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { SubSystemController } from './sub-system/sub-system.controller';
import { SubSystemService } from './sub-system/subsystem.service';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [TypeOrmModule.forFeature([System, User])],
  controllers: [SystemController, SubSystemController],
  providers: [SystemService, SubSystemService, UserCheckerService, JwtStrategy],
})
export class SystemModule {}
