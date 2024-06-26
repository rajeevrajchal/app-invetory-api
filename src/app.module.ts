import { AllExceptionsFilter } from '@exception/exception';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './module/auth/auth.module';
import { CustomerModule } from './module/customer/customer.module';
import { FeatureModule } from './module/feature/feature.module';
import { SystemModule } from './module/system/system.module';
import { UserModule } from './module/user/user.module';
import { VendorModule } from './module/vendor/vendor.module';
import { WorkLogsModule } from './module/work_logs/work_logs.module';
import { TeamsModule } from './module/teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: [
        join(__dirname, 'module', '**', '**', '**', '*.entity.{ts,js}'),
        join(__dirname, '**', '*.entity.{ts,js}'),
      ],

      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,

    SystemModule,

    AuthModule,

    FeatureModule,

    VendorModule,

    CustomerModule,

    WorkLogsModule,

    TeamsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
