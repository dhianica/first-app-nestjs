import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  private readonly employees: CreateEmployeeDto[] = [];

  checkUnique(employeeDto: CreateEmployeeDto): boolean {
    const employee = this.employees.find((x) =>
      x.id === employeeDto.id ||
      x.nik === employeeDto.nik);
    if (employee) {
      return true;
    }
    return false;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    try {
      if (!this.checkUnique(createEmployeeDto)) {
        let newId = 0
        if (this.employees.length > 0) {
          newId = Math.max(...this.employees.map(o => o.id))
        }
        createEmployeeDto.id = newId + 1;
        this.employees.push(createEmployeeDto);
        return createEmployeeDto;
      }
      return null
    } catch (error) {
      throw error;
    }
  }

  findAll(): CreateEmployeeDto[] {
    return this.employees;
  }

  findOne(id: number): CreateEmployeeDto {
    return this.employees.find((x) => x.id === id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateEmployeeDto> {
    try {
      const employee = this.findOne(id);
      if (employee) {
        employee.nik = updateEmployeeDto.nik || employee.nik;
        employee.firstname = updateEmployeeDto.firstname || employee.firstname;
        employee.lastname = updateEmployeeDto.lastname || employee.lastname;
        employee.birthday = updateEmployeeDto.birthday || employee.birthday;
        return updateEmployeeDto;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const employee = this.employees.findIndex((x) => x.id === id);
      this.employees.splice(employee, 1);
      return id;
    } catch (error) {
      throw error;
    }
  }
}
