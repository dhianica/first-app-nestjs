import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './interfaces/employee.interface'
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeeService.create(createEmployeeDto)
    } catch (error) {
      throw error
    }
  }

  @Get()
  async findAll(): Promise<any> {
    while (true) { }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CreateEmployeeDto> {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateEmployeeDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.employeeService.remove(id);
  }
}
