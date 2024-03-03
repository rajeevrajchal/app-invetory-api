// system.entity.ts
import { BaseDB } from '@base/base-db.entity';
import { User } from '@module/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SYSTEM_STATUS } from '../enum/system-status.enum';
import { Feature } from './feature.entity';

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
  role: SYSTEM_STATUS;

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
}
