import { IsNotEmpty, IsString, Length,Validate } from "class-validator";
import { ValidadeCpf } from "../validators/validateCpf";

export class LoginDto{
    @IsNotEmpty({message:"Funcionário deve possuir um nome"})
    @IsString({message:"Nome do funcionário não pode ser um número"})
    @Length(4)
    nomefuncionario:string

    @IsNotEmpty({message:"CPF não pode ser vazio"})
    @IsString({})
    @Validate(ValidadeCpf)
    cpf:string
}