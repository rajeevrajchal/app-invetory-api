import { JwtAuthGuard } from '@middleware/guard/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {}
