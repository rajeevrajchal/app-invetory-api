import { BaseDB } from '@base/base-db.entity';
import { Column, Entity } from 'typeorm';
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
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.ADMIN,
  })
  role: USER_ROLE;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  otp: string;

  @Column()
  otp_expiry: Date;

  @Column()
  refresh_token: string;

  @Column()
  reset_token: string;

  @Column({
    default: false,
  })
  is_temp: boolean;
}
