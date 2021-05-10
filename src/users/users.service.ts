import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from './user.model';

import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getRoleByValue('USER');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUser() {
    return await this.userRepository.findOne();
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDTO) {
    const { userId, value } = dto;
    const user = await this.getUserById(userId);
    const role = await this.rolesService.getRoleByValue(value);
    if (user && role) {
      user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDTO) {
    const { userId, banReason } = dto;
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = banReason;
    await user.save();
    return user;
  }
}
