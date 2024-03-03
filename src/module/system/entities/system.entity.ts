import { BaseDB } from '@base/base-db.entity';
import { Column, Entity } from 'typeorm';

@Entity('systems')
export class System extends BaseDB {
  @Column()
  name: string;
}
