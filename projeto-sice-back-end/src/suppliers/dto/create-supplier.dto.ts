import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty({message:"O nome do fornecedor não pode ser vazio!"})
    @IsString({message:"O nome do fornecedor deve ser composto por letras!"})
    nomefornecedor:string;

    @IsOptional()
    @Length(11,14,{message:"Telefone deve ter no mínimo 11 números!"})
    telefone:string;

    @IsNotEmpty({message:"CNPJ  é obrigatório!"})
    @Length(14,14,{message:"CNPJ deve ter 14 números!"})
    CNPJ:string;

    @IsOptional()
    @IsEmail({},{message:"Deve ter um formato de email válido!"})
    email:string;

    @IsNotEmpty({message:"Endereço não pode ser vazio!"})
    @Length(5,87897897789798,{message:"Endereço Deve ter no mínimo 5 caracteres!"})
    endereco:string;
}
