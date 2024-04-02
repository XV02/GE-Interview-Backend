import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
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

    
    return {
      message: 'Employee created successfully',
      status: 201,
    };
  }
}
