import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsInt, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto   extends PartialType(CreateEmployeeDto){
    @IsNotEmpty()
    @IsInt()
    readonly id: number;

    @IsNotEmpty()
    @IsInt({message: "Must be a number"})
    nik: number;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsNotEmpty()
    @IsDate()
    birthday: string;
}
