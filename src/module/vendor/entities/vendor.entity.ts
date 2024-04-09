// system.entity.ts
import { BaseDB } from '@base/base-db.entity';
import { User } from '@module/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('vendors')
export class Vendor extends BaseDB {
  @Column()
  name: string;

  // relations
  @ManyToOne(() => User, (user) => user.vendors)
  user: User;
}
