import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { XpDto } from './dto/xp.dto';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto, tenantId: string) {
    const employeeSearch = await this.employeeRepository.createQueryBuilder('employee')
      .where('employee.email = :email', { email: createEmployeeDto.email })
      .getRawOne();

    if (employeeSearch) {
      throw new HttpException('Employee already exists', 400);
    }

    const employeePayload = {
      ...createEmployeeDto,
      xp: 0,
      tenantId: tenantId,
    }

    const employee = this.employeeRepository.create(employeePayload);

    await this.employeeRepository.save(employee);

    await this.tenantRepository.update(tenantId, {
      lastInteraction: new Date(),
    });
    
    return {
      message: 'Employee created successfully',
      status: 201,
    };
  }

  async finByTenant(tenantId: string) {
    return await this.employeeRepository.createQueryBuilder('employee')
      .where('employee.tenantId = :tenantId', { tenantId })
      .select([
        'employee.id AS "id"',
        'employee.name AS "name"',
        'employee.email AS "email"',
        'employee.pronouns AS "pronouns"',
        'employee.instagramHandle AS "instagramHandle"',
        'employee.profilePicture AS "profilePicture"',
        'employee.xp AS "xp"',
      ])
      .getRawMany();
  }

  async addXp(xpDto: XpDto, tenantId: string) {
    const employee = await this.employeeRepository.createQueryBuilder('employee')
      .where('employee.id = :id', { id: xpDto.employeeId })
      .andWhere('employee.tenantId = :tenantId', { tenantId })
      .select([
        'employee.xp AS "xp"',
      ])
      .getRawOne();

    if (!employee) {
      throw new HttpException('Employee not found', 404);
    }

    const updatedXp = employee.xp + xpDto.xp;

    await this.employeeRepository.createQueryBuilder('employee')
      .update(Employee)
      .set({ xp: updatedXp })
      .where('id = :id', { id: xpDto.employeeId })
      .execute();

    await this.tenantRepository.update(tenantId, {
      lastInteraction: new Date(),
    });

    return {
      message: 'XP added successfully',
      status: 200,
    };
  }
}
