import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDTO } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import Role from './role.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDTO) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получить все роли' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить роль' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getOneByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
