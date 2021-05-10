import { ApiProperty } from '@nestjs/swagger';

export class BanUserDTO {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор' })
  readonly userId: number;

  @ApiProperty({ example: 'Прост', description: 'Причина бана' })
  readonly banReason: string;
}
