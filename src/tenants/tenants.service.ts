import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { TenantLoginDto } from './dto/tenant-login';
import { JwtService } from '@nestjs/jwt';

import cron from 'node-cron';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const tenantSearch = await this.tenantRepository.createQueryBuilder('tenant')
      .where('tenant.email = :email', { email: createTenantDto.email })
      .getRawOne();

    if (tenantSearch) {
      throw new HttpException('Tenant already exists', 400);
    }

    createTenantDto.password = await this.saltPassword(createTenantDto.password);

    const payload = {
      ...createTenantDto,
      lastInteraction: new Date(),
    };

    const tenant = this.tenantRepository.create(payload);

    await this.tenantRepository.save(tenant);

    return {
      message: 'Tenant created successfully',
      status: HttpStatus.CREATED,
    };
  }

  async tenantLogin(tenantLoginDto: TenantLoginDto) {
    const tenant = await this.tenantRepository.createQueryBuilder('tenant')
      .where('tenant.email = :email', { email: tenantLoginDto.email })
      .select([
        'tenant.id AS "id"',
        'tenant.email AS "email"',
        'tenant.password AS "password"'
      ])
      .getRawOne();

    if (!tenant) {
      throw new HttpException('Tenant not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(tenantLoginDto.password, tenant.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = {
      id: tenant.id,
      email: tenant.email,
    };

    await this.tenantRepository.update(tenant.id, {
      lastInteraction: new Date(),
    });

    return {
      token: this.jwtService.sign(payload),
      status: HttpStatus.OK,
    };
  }

  async findAll() {
    return await this.tenantRepository.find();
  }

  async saltPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async deleteInactiveTenants() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const inactiveTenants = await this.tenantRepository.createQueryBuilder('tenant')
      .where('tenant.lastInteraction < :lastInteraction', { lastInteraction: oneYearAgo })
      .select([
        'tenant.id AS "id"',
      ])
      .getRawMany();
    
    inactiveTenants.forEach(async tenant => {
      await this.tenantRepository.delete(tenant.id);
    });
  }

  // Do a cron job that runs every day at midnight to delete inactive tenants
  cronJob() {
    cron.schedule('0 0 * * *', () => {
      this.deleteInactiveTenants();
    });
  }
}
