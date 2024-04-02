import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiTags } from '@nestjs/swagger';
import { TenantLoginDto } from './dto/tenant-login';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Post('login')
  tenantLogin(@Body() tenantLoginDto: TenantLoginDto) {
    return this.tenantsService.tenantLogin(tenantLoginDto);
  }
}
