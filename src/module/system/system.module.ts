import { UserCheckerService } from '@helpers/user-checker.service';
import { JwtStrategy } from '@middleware/strategy/jwt.strategy';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  imports: [TypeOrmModule.forFeature([System, User])],
  controllers: [SystemController],
  providers: [SystemService, UserCheckerService, JwtStrategy],
})
export class SystemModule {}
