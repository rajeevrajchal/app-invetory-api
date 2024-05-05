// system.entity.ts
import { BaseDB } from '@base/base-db.entity';
import { System } from '@module/system/entities/system.entity';
import { User } from '@module/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('work_logs')
export class WorkLogs extends BaseDB {
  @Column()
  date: Date;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  hours: number;

  @Column({
    nullable: true,
  })
  week_count: number;

  @ManyToOne(() => System, (system) => system.work_log)
  @JoinColumn({ name: 'app_id' })
  app: System;

  @ManyToOne(() => User, (user) => user.work_logs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
