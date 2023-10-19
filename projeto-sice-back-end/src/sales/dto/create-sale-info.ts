import { IsArray, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateSaleDto } from "./create-sale.dto";
import { Type } from "class-transformer";

enum FormaPagament {
    Pix = "Pix",
    Dinheiro = "Dinheiro"
}

export class CreateSaleInfoDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleDto)
    itensVenda: CreateSaleDto[]

    @IsNotEmpty()
    @IsEnum(FormaPagament)
    formaPagamento: string
}