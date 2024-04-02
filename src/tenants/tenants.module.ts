import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyModule } from 'src/jwt-strategy/jwt-strategy.module';

@Module({
  imports: [
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
