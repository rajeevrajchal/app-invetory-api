import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './module/user/user.module';
import { SystemModule } from './module/system/system.module';
import { AuthModule } from './module/auth/auth.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
