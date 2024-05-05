// system.entity.ts
import { BaseDB } from '@base/base-db.entity';
import { User } from '@module/user/entities/user.entity';
import { WorkLogs } from '@module/work_logs/entities/work_log.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Feature } from '../../feature/entities/feature.entity';
import { SYSTEM_STATUS } from '../enum/system-status.enum';

@Entity('systems')
export class System extends BaseDB {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  domain: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  repository: string;

  @Column({
    nullable: true,
  })
  branch: string;

  @Column({
    nullable: false,
    default: false,
  })
  isParent: boolean;

  @Column({
    nullable: false,
    type: 'enum',
    enum: SYSTEM_STATUS,
    default: SYSTEM_STATUS.DRAFT,
  })
  status: SYSTEM_STATUS;

  // relations
  @ManyToOne(() => User, (user) => user.systems)
  user: User;

  @ManyToOne(() => System, (system) => system.subSystems, {
    nullable: true,
  })
  parent: System;

  @OneToMany(() => System, (system) => system.parent)
  subSystems: System[]; // Updated property name to plural

  @ManyToOne(() => Feature, (feature) => feature.system)
  features: Feature[];

  @ManyToOne(() => WorkLogs, (feature) => feature.app)
  work_log: WorkLogs[];
}
