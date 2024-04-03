import { BaseDB } from '@base/base-db.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { System } from '../../system/entities/system.entity';
import { FEATURE_STATUS } from '../enum/feature.enum';

@Entity('features')
export class Feature extends BaseDB {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  key: string;

  @Column({
    default: false,
  })
  is_active: boolean;

  @Column({
    nullable: false,
    type: 'enum',
    enum: FEATURE_STATUS,
    default: FEATURE_STATUS.DRAFT,
  })
  status: FEATURE_STATUS;

  // relations
  @OneToOne(() => System, (system) => system.features)
  @JoinColumn({ name: 'system_id' })
  system: System;
}
