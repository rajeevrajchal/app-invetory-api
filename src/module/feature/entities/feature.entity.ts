import { BaseDB } from '@base/base-db.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { System } from '../../system/entities/system.entity';

@Entity('features')
export class Feature extends BaseDB {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: false,
  })
  is_active: boolean;

  // relations
  @OneToOne(() => System, (system) => system.features)
  @JoinColumn({ name: 'system_id' })
  system: System;
}
