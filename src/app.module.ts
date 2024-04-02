import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { EmployeeModule } from './employee/employee.module';
import { JwtStrategyModule } from './jwt-strategy/jwt-strategy.module';

@Module({
  imports: [
    TenantsModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    EmployeeModule,
    JwtStrategyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
