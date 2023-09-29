import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { ValidadeCpf } from "../validators/validateCpf";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    nomefuncionario: string;

    @IsString()
    endereco: string;

    @IsNumber()
    @IsNotEmpty()
    Cargo_idCargo: number;

    @Validate(ValidadeCpf)
    @IsString()
    @IsNotEmpty()
    cpf: string;
}