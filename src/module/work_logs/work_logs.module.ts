import { Module } from '@nestjs/common';
import { WorkLogsService } from './work_logs.service';
import { WorkLogsController } from './work_logs.controller';

@Module({
  providers: [WorkLogsService],
  controllers: [WorkLogsController]
})
export class WorkLogsModule {}
