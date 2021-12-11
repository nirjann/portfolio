import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../types/user-role-entity.type';

@Entity({ database: 'user_roles' })
export class user_roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    array: true,
    enum: UserRoles,
  })
  roles: UserRoles[];
}
