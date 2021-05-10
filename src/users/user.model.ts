import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Post from 'src/posts/post.model';
import Role from 'src/roles/role.model';
import UserRole from './user-role.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export default class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'foo@bar.com', description: 'Почтовый ящик' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Pro100to', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  //   Вынести в отдельную таблицу
  @ApiProperty({
    example: 'true | false',
    description: 'Забанен пользователь или нет',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: '"" | "Так се типок"',
    description: 'Забанен пользователь или нет',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
