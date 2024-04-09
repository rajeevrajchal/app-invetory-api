import { BaseDB } from '@base/base-db.entity';
import { System } from '@module/system/entities/system.entity';
import { Vendor } from '@module/vendor/entities/vendor.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { USER_ROLE } from '../enum/user-role.enum';

@Entity('users')
export class User extends BaseDB {
  @Column()
  name: string;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    default: '',
  })
  password?: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.ADMIN,
  })
  role: USER_ROLE;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true,
  })
  otp: string;

  @Column({
    nullable: true,
  })
  otp_expiry: Date;

  @Column({
    nullable: true,
  })
  auth_provider: string;

  @Column({
    nullable: true,
  })
  auth_provider_id: string;

  @Column({
    nullable: true,
  })
  refresh_token: string;

  @Column({
    nullable: true,
  })
  reset_token: string;

  @Column({
    default: false,
  })
  is_temp: boolean;

  @OneToMany(() => System, (system) => system.user)
  systems: System[];

  @OneToMany(() => Vendor, (system) => system.user)
  vendors: Vendor[];
}
