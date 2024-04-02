import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [JwtStrategyService],
  exports: [JwtStrategyService],
})
export class JwtStrategyModule {}
