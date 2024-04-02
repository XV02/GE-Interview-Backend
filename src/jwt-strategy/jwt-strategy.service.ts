import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from 'src/tenants/entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategyService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async validateUser(id: string) {
    return (await this.tenantRepository.findOne(id)) !== undefined;
  }
}
