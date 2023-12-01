import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { RoleName } from '../constants/roles.contants';



@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleName,
    default: RoleName.USER,
  })
  name: RoleName;

  @ManyToOne(() => User, user => user.roles)
  user: User;
}
