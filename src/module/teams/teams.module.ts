import { System } from '@module/system/entities/system.entity';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([System, User, Team])],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
