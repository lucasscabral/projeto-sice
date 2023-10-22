import { IsNotEmpty, IsOptional, IsString, Length, Validate } from "class-validator";
import { ValidadeCpf } from "../validators/validateCpf";

export class CreateEmployeeDto {
    @IsNotEmpty({message:"Funcionário deve possuir um nome"})
    @IsString({message:"Nome do funcionário não pode ser um número"})
    @Length(4)
    nomefuncionario:string

    @IsNotEmpty({message:"Funcionário deve possuir um endereço"})
    endereco:string

    @IsNotEmpty({message:"O funcionário deve possuir um cargo"})
    Cargo_idCargo:number

    @Validate(ValidadeCpf)
    @IsNotEmpty({message:"CPF não pode ser vazio"})
    @IsString()
    cpf:string

    @IsOptional()
    funcionariotelefone?:string
}
