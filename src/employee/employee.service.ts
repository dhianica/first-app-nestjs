import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { INSERTED, UPDATED, NOT_FOUND, FOUND, SUCCESS } from 'src/common/constants/response.constants';

@Injectable()
export class EmployeeService {
  private readonly employees: CreateEmployeeDto[] = [];

  checkUnique(employeeDto: CreateEmployeeDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const employee = this.employees.find((x) =>
          x.id === employeeDto.id ||
          x.nik === employeeDto.nik);
        if (employee) {
          reject(new BadRequestException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Duplicated NIK or ID!'
          }))
        } else {
          resolve({
            status: HttpStatus.CREATED,
            message: HttpStatus[HttpStatus.CREATED],
            data: []
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.checkUnique(createEmployeeDto)
          .then((value) => {
            let newId = 0
            if (this.employees.length > 0) {
              newId = Math.max(...this.employees.map(o => o.id))
            }
            createEmployeeDto.id = newId + 1;
            this.employees.push(createEmployeeDto);
            value.data = createEmployeeDto
            resolve(value);
          }).catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error);
      }
    })

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
