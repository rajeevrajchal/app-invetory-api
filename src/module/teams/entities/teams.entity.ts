// system.entity.ts
import { BaseDB } from '@base/base-db.entity';
import { Column, Entity } from 'typeorm';

@Entity('teams')
export class Team extends BaseDB {
  @Column()
  name: string;
}
