import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'foo@bar.com', description: 'Почтовый ящик' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  @ApiProperty({ example: 'Pro100to', description: 'Пароль' })
  readonly password: string;
}
