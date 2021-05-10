import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDTO {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'ADMIN', description: 'Роль' })
  readonly value: string;
}
