import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-AuthGuard';
import { TenantDto } from './dto/tenant.dto';
import { XpDto } from './dto/xp.dto';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    return this.employeeService.create(createEmployeeDto, req.user.id);
  }

  @Post('add-xp')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  addXp(@Body() xpDto: XpDto, @Req() req: any) {
    return this.employeeService.addXp(xpDto, req.user.id);
  }

  @Post('get-by-tenant')
  findByTenant(@Body() tenantDto: TenantDto) {
    return this.employeeService.finByTenant(tenantDto.tenantId);
  }
}
