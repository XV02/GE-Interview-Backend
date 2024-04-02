import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const tenantSearch = await this.tenantRepository.createQueryBuilder('tenant')
      .where('tenant.email = :email', { email: createTenantDto.email })
      .getRawOne();

    if (tenantSearch) {
      throw new HttpException('Tenant already exists', 400);
    }

    createTenantDto.password = await this.saltPassword(createTenantDto.password);

    const tenant = this.tenantRepository.create(createTenantDto);

    await this.tenantRepository.save(tenant);

    return {
      message: 'Tenant created successfully',
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    return await this.tenantRepository.find();
  }

  async saltPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
