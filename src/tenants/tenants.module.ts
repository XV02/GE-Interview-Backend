import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'src/jwt-strategy/jwt-strategy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    JwtStrategyModule,
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
