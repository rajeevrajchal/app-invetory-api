import { JwtStrategy } from '@middleware/strategy/jwt.strategy';
import { System } from '@module/system/entities/system.entity';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  imports: [TypeOrmModule.forFeature([System, Feature, User])],
  providers: [FeatureService, JwtStrategy],
  controllers: [FeatureController],
})
export class FeatureModule {}
