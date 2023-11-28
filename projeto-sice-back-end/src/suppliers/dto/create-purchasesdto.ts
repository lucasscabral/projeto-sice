import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { DataPurchasesDto } from "./data-purchasesdto";

export class CreatePurchasesDto {

    @IsNotEmpty({ message: "O id do fornecedor não pode ser vazio!" })
    @IsNumber({}, { message: "O id do fornecedor deve ser número!" })
    idfornecedor: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataPurchasesDto)
    itensCompra: DataPurchasesDto[]
}
