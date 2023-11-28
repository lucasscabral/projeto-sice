import { IsISO8601, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class DataPurchasesDto {
    nomeproduto: string;
    categoria: number;
    @IsISO8601({}, { message: "Deve possuir uma data" })
    vencimento: string;
    descricao: string;
    @IsNotEmpty({ message: "A quantidade do produto não pode ser vazio!" })
    @IsNumber({}, { message: "Quantidade deve ser um número!" })
    quantidade: number;

    @IsNotEmpty({ message: "O preço do produto não pode ser vazio!" })
    @IsNumberString({}, { message: "O preço deve ser um número!" })
    valor_unitario: number;

    idprodutos: number;
}
