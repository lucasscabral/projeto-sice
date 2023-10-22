import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateSaleDto {
    @IsNotEmpty({ message: "Quantidade não pode ser vazio" })
    @IsNumber({}, { message: "Quantidade deve ser um número inteiro" })
    quantidade: number;

    @IsNotEmpty({ message: "Deve possuir o id do produto" })
    @IsNumber({}, { message: "Id do produto deve ser um número inteiro" })
    idprodutos: number;
}


