import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
import User from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDTO) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDTO) {
    const { email, password } = dto;
    const user = await this.userService.getUserByEmail(email);
    const equalsPassword = await bcrypt.compare(password, user.password);
    if (user && equalsPassword) return user;
    throw new UnauthorizedException({
      message: 'Некорретный email или пароль',
    });
  }

  async registration(dto: CreateUserDTO) {
    const { email, password } = dto;
    const candidat = await this.userService.getUserByEmail(email);

    if (candidat) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 6);
    const user = await this.userService.createUser({
      email,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }
}
