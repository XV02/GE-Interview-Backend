import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { JwtStrategyModule } from 'src/jwt-strategy/jwt-strategy.module';
import { JwtStrategy } from 'src/jwt/jwt-strategy';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Tenant]),
    JwtStrategyModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtStrategy],
})
export class EmployeeModule {}
