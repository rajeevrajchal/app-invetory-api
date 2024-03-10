import { UserCheckerService } from '@helpers/user-checker.service';
import { ValidateUser } from '@helpers/validate-user.service';
import { GoogleStrategy } from '@middleware/strategy/google.strategy';
import { LocalStrategy } from '@middleware/strategy/local.strategy';
import { User } from '@module/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ValidateUser,
    UserCheckerService,
    LocalStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
