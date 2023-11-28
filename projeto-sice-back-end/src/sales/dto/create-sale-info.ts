import { IsArray, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateSaleDto } from "./create-sale.dto";
import { Type } from "class-transformer";

export enum FormaPagamento {
    Pix = 'Pix',
    Dinheiro = 'Dinheiro',
    Credito = 'Credito',
    Debito = 'Debito'
}

export class CreateSaleInfoDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleDto)
    itensVenda: CreateSaleDto[]

    @IsNotEmpty()
    @IsEnum(FormaPagamento)
    formaPagamento: FormaPagamento
}