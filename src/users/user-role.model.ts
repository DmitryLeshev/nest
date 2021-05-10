import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import User from './user.model';
import Role from '../roles/role.model';

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export default class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER })
  userId: number;
  @ForeignKey(() => Role)
  @Column({ type: DataType.NUMBER })
  roleId: number;
}
