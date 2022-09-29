import { IsInt, IsString, IsDateString, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsInt({message: "NIK Must be a number"})
    nik: number;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsNotEmpty()
    @IsDateString()
    birthday: string;
}
